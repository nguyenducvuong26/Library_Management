import { createContext, useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'

import { DEFAULT_PHOTO_URL, ROLE } from 'config'

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

  const updateUser = async (data) => {
    const { photoURL, email, displayName, phone, address, userId } = data || {}

    await updateProfile(auth.currentUser, {
      ...(photoURL && { photoURL }),
      ...(displayName && { displayName }),
    })

    await updateEmail(auth.currentUser, email)

    await updateDoc(doc(db, 'users', userId), {
      updatedAt: serverTimestamp(),
      ...(photoURL && { photoURL }),
      ...(email && { email }),
      ...(displayName && { displayName }),
      ...(phone && { phone }),
      ...(address && { address }),
    })

    setUser((prev) => ({ ...prev, ...data }))
  }

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

    const {
      role = '',
      phone = '',
      address = '',
    } = (await getDoc(doc(db, 'users', uid))).data() || {}

    localStorage.setItem('token', _tokenResponse.idToken)
    localStorage.setItem('expireTime', new Date().getTime() + 3.6 * 10 ** 6)

    setIsAuthenticated(true)
    setUser({
      id: uid,
      displayName,
      email: userEmail,
      photoURL,
      role,
      phone,
      address,
    })
  }

  const logout = async () => {
    await signOut(auth)

    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')

    clearTimeout(expiredTimer)
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

    const { email: userEmail = '', uid = '' } = user

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: DEFAULT_PHOTO_URL,
    })

    await setDoc(doc(db, 'users', uid), {
      displayName: name,
      email: userEmail,
      photoURL: DEFAULT_PHOTO_URL,
      role: ROLE.MEMBER,
      phone: null,
      address: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    localStorage.setItem('token', _tokenResponse.idToken)
    localStorage.setItem('expireTime', new Date().getTime() + 3.6 * 10 ** 6)

    setIsAuthenticated(true)
    setUser({
      id: uid,
      displayName: name,
      email: userEmail,
      photoURL: DEFAULT_PHOTO_URL,
      phone: null,
      address: null,
      role: ROLE.MEMBER,
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
        const {
          displayName = '',
          email = '',
          photoURL = '',
          role = '',
          phone = '',
          address = '',
        } = user || {}

        setIsAuthenticated(true)
        setIsInitialized(true)
        setUser({
          id: userId,
          displayName,
          email,
          photoURL,
          role,
          phone,
          address,
        })

        clearTimeout(expiredTimer)

        expiredTimer = setTimeout(logout, timeLeft)
      } else {
        await logout()
        setIsInitialized(true)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        updateUser,
        isInitialized,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
