import { createContext, useEffect, useState } from 'react'

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'

import { app } from 'utils/firebase'

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

const auth = getAuth(app)

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

  const logout = async () => {
    await signOut(auth)

    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')

    setIsAuthenticated(false)
    setUser(null)
  }

  const register = () => {
    console.log('Register')
  }

  useEffect(() => {
    function init() {
      const token = localStorage.getItem('token')
      const expireTime = localStorage.getItem('expireTime')

      const currentTime = new Date().getTime()
      const timeLeft = expireTime - currentTime
      const isExpired = timeLeft < 10000 // 30 seconds

      if (token && !isExpired) {
        const {
          email = '',
          name = '',
          user_id: userId = '',
          picture = '',
        } = jwtDecode(token)
        setIsAuthenticated(true)
        setIsInitialized(true)

        setUser({
          id: userId,
          name,
          email,
          avatar: picture,
          role: 'Admin',
        })

        clearTimeout(expiredTimer)

        expiredTimer = setTimeout(() => {
          logout()
        }, timeLeft)
      } else {
        logout()
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
