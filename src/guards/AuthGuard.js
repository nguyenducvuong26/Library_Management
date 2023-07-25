// import { useState } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import Login from 'pages/auth/Login'
import { useContext } from 'react'

import { AuthContext } from 'context/auth'
import Auth from 'pages/auth'
import PropTypes from 'prop-types'

import LoadingScreen from 'components/LoadingScreen'

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default function AuthGuard({ children }) {
  const { isInitialized = false, isAuthenticated = false } =
    useContext(AuthContext)

  if (!isInitialized) return <LoadingScreen />

  if (!isAuthenticated) return <Auth />

  return <>{children}</>
}
