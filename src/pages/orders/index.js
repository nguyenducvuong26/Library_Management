import { Link } from 'react-router-dom'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { OrdersSection } from 'sections/orders'

export default function Orders() {
  return (
    <div className='px-10 py-8'>
      <HeaderBreadcrumb
        heading='Orders'
        items={[
          {
            title: <Link to={PATH_DASHBOARD.dashboard.root}>Dashboard</Link>,
            key: 'dashboard',
          },
          {
            title: 'Orders',
            key: 'orders',
          },
        ]}
      />

      <OrdersSection />
    </div>
  )
}
