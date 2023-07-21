import { useNavigate } from 'react-router-dom'

import {
  AppstoreOutlined,
  BankOutlined,
  CalendarOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'

import { PATH_DASHBOARD } from 'routes/paths'

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  }
}

const NAV_ITEMS = [
  { type: 'divider' },
  getItem('Dashboard', 'dashboard', <AppstoreOutlined />),
  getItem('Library', 'library', <BankOutlined />),
  getItem('Loans', 'loans', <CalendarOutlined />),
  getItem('Orders', 'orders', <ShoppingCartOutlined />),
  getItem('Members', 'members', <UserOutlined />),
]

const DROP_DOWN_ITEMS = [
  {
    key: 'logout',
    label: 'Log out',
  },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className='h-full'>
      <div className='p-4'>Logo</div>

      <Dropdown trigger='click' menu={{ items: DROP_DOWN_ITEMS }}>
        <div className='flex p-4 justify-between items-center'>
          <div className='flex justify-between items-center'>
            <Avatar size={42}>A</Avatar>

            <div className='ml-4'>
              <h2 className='text-base font-semibold'>Test Name</h2>
              <h3 className='text-gray-500'>Admin</h3>
            </div>
          </div>

          <div className='text-xs'>
            <DownOutlined />
          </div>
        </div>
      </Dropdown>

      <Menu
        onClick={(e) => navigate(PATH_DASHBOARD[e.key].root)}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
        }}
        mode='inline'
        items={NAV_ITEMS}
      />
    </div>
  )
}
