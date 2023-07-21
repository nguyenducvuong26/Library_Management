import { createContext, useState } from 'react'

import PropTypes from 'prop-types'

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = () => {
    console.log('Login')
    setIsAuthenticated(true)
    setUser({
      name: 'Test Name',
      email: 'test@test.com',
      avatar: '',
      role: 'Admin',
    })
  }

  const logout = () => {
    console.log('Logout')
    setIsAuthenticated(false)
    setUser(null)
  }

  const register = () => {
    console.log('Register')
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
