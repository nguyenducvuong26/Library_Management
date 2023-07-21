// import loadable from '@loadable/component'
import PropTypes from 'prop-types'

// hooks
// import useRole from 'hooks/useRole'

// const Forbidden = loadable(() => import('components/Forbidden'))

RoleBasedGuard.propTypes = {
  // hasContent: PropTypes.bool,
  // roles: PropTypes.arrayOf(PropTypes.string), // Example ['Director', 'Leader', 'Memeber']
  children: PropTypes.node.isRequired,
}

export default function RoleBasedGuard({
  // hasContent = false,
  // roles = [],
  children,
}) {
  // const { checkAccessPermission } = useRole()
  // const hasRole = checkAccessPermission(roles)

  // if (!hasRole) {
  //   return hasContent ? <Forbidden /> : null
  // }

  return <>{children}</>
}
