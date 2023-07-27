import { useContext } from 'react'

import { AuthContext } from 'context/auth'

import { ROLE } from 'config'

const useRole = () => {
  const { user } = useContext(AuthContext)
  const { role } = user || {}

  return {
    currentRole: role,
    isAdminRole: ROLE.ADMIN === role,
    isMemberRole: ROLE.MEMBER === role,
  }
}

export default useRole
