import { Navigate } from 'react-router-dom'

import { PATH_DASHBOARD } from 'routes/paths'

export default function HomePage() {
  return <Navigate to={PATH_DASHBOARD.dashboard.root} />
}
