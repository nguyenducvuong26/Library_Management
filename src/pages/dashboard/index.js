import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import DashboardSection from 'sections/dashboard'

export default function Dashboard() {
  return (
    <div className='px-10 py-8'>
      <HeaderBreadcrumb heading='Dashboard' items={[]} />

      <DashboardSection />
    </div>
  )
}
