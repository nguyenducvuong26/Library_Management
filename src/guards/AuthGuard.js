// import { useState } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import Login from 'pages/auth/Login'
import Auth from 'pages/auth'
import PropTypes from 'prop-types'

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default function AuthGuard({ children }) {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Auth />
  }

  return <>{children}</>
}
