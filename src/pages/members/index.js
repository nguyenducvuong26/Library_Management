import { Link } from 'react-router-dom'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { MembersSection } from 'sections/members'

export default function Members() {
  return (
    <div className='px-10 py-8'>
      <HeaderBreadcrumb
        heading='Members'
        items={[
          {
            title: <Link to={PATH_DASHBOARD.dashboard.root}>Dashboard</Link>,
            key: 'dashboard',
          },
          {
            title: 'Members',
            key: 'members',
          },
        ]}
      />
      <MembersSection />
    </div>
  )
}
