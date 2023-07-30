import { Navigate } from 'react-router-dom'

import useRole from 'hooks/useRole'

import { PATH_DASHBOARD } from 'routes/paths'

export default function HomePage() {
  const { isMemberRole = false } = useRole()

  if (isMemberRole) return <Navigate to={PATH_DASHBOARD.library.root} />

  return <Navigate to={PATH_DASHBOARD.dashboard.root} />
}
