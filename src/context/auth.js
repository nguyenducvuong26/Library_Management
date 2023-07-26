import { createContext, useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'

import { auth, db } from 'utils/firebase'

export const AuthContext = createContext({
  user: null,
  isInitialized: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

let expiredTimer

export default function AuthProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const { _tokenResponse, user = {} } = userCredential
    const {
      displayName = '',
      email: userEmail = '',
      photoURL = '',
      uid = '',
    } = user

    const currentUser = (await getDoc(doc(db, 'users', uid))).data()

    localStorage.setItem('token', _tokenResponse.idToken)
    localStorage.setItem('expireTime', new Date().getTime() + 3.6 * 10 ** 6)

    setIsAuthenticated(true)
    setUser({
      id: uid,
      displayName,
      email: userEmail,
      photoURL,
      role: currentUser.role,
    })
  }

  const logout = async () => {
    console.log('Run')
    await signOut(auth)

    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')

    setIsAuthenticated(false)
    setUser(null)
  }

  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { _tokenResponse, user = {} } = userCredential
    const {
      displayName = '',
      email: userEmail = '',
      photoURL = '',
      uid = '',
    } = user

    await updateProfile(auth.currentUser, { displayName: name })
    await setDoc(doc(db, 'users', uid), {
      displayName: name,
      email: userEmail,
      photoURL,
      role: 'Member',
    })

    localStorage.setItem('token', _tokenResponse.idToken)
    localStorage.setItem('expireTime', new Date().getTime() + 3.6 * 10 ** 6)

    setIsAuthenticated(true)
    setUser({
      id: uid,
      name: displayName,
      email: userEmail,
      avatar: photoURL,
      role: 'Admin',
    })
  }

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('token')
      const expireTime = localStorage.getItem('expireTime')

      const currentTime = new Date().getTime()
      const timeLeft = expireTime - currentTime
      const isExpired = timeLeft < 10000 // 10 seconds

      if (token && !isExpired) {
        const { user_id: userId = '' } = jwtDecode(token)
        const user = (await getDoc(doc(db, 'users', userId))).data()
        const { displayName, email, photoURL, role } = user

        setIsAuthenticated(true)
        setIsInitialized(true)
        setUser({
          id: userId,
          displayName,
          email,
          photoURL,
          role,
        })

        clearTimeout(expiredTimer)

        expiredTimer = setTimeout(() => {
          logout()
        }, timeLeft)
      } else {
        logout()
        setIsInitialized(true)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isInitialized, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
