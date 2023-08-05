import { Link } from 'react-router-dom'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { LoansSection } from 'sections/loans'

export default function Loans() {
  return (
    <div className='px-10 py-8'>
      <HeaderBreadcrumb
        heading='Loans'
        items={[
          {
            title: <Link to={PATH_DASHBOARD.dashboard.root}>Dashboard</Link>,
            key: 'dashboard',
          },
          {
            title: 'Loans',
            key: 'loans',
          },
        ]}
      />
      <LoansSection />
    </div>
  )
}
