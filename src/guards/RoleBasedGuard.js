import { useContext } from 'react'

import { AuthContext } from 'context/auth'
import PropTypes from 'prop-types'

import Forbidden from 'components/Forbidden'

RoleBasedGuard.propTypes = {
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Director', 'Leader', 'Memeber']
  children: PropTypes.node.isRequired,
}

export default function RoleBasedGuard({
  hasContent = false,
  roles = [],
  children,
}) {
  const { user } = useContext(AuthContext)

  const { role } = user

  const hasRole = [].concat(roles).includes(role)

  if (!hasRole) {
    return hasContent ? <Forbidden /> : null
  }

  return <>{children}</>
}
