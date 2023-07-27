import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AppstoreOutlined,
  BankOutlined,
  CalendarOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Image, Menu } from 'antd'
import { AuthContext } from 'context/auth'

import { PAGES, ROLE_BY_PAGE } from 'config'

import { PATH_DASHBOARD } from 'routes/paths'

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  }
}

const NAV_ITEMS_CONFIG = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    roles: ROLE_BY_PAGE[PAGES.Dashboard],
  },
  {
    label: 'Library',
    key: 'library',
    icon: <BankOutlined />,
    roles: ROLE_BY_PAGE[PAGES.Library],
  },
  {
    label: 'Loans',
    key: 'loans',
    icon: <CalendarOutlined />,
    roles: ROLE_BY_PAGE[PAGES.Loans],
  },
  {
    label: 'Orders',
    key: 'orders',
    icon: <ShoppingCartOutlined />,
    roles: ROLE_BY_PAGE[PAGES.Orders],
  },
  {
    label: 'Members',
    key: 'members',
    icon: <UserOutlined />,
    roles: ROLE_BY_PAGE[PAGES.Members],
  },
]

const NAV_ITEMS_BY_ROLE = (role) =>
  NAV_ITEMS_CONFIG.map(
    ({ label, key, icon, roles }) =>
      roles.includes(role) && getItem(label, key, icon)
  )

const DROP_DOWN_ITEMS = [
  {
    key: 'logout',
    label: 'Log out',
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logout, user } = useContext(AuthContext)

  const { role, photoURL, displayName } = user || {}

  const handleSelectDropdownItem = (e) => {
    if (e.key === 'logout') logout()
  }

  return (
    <div className='h-full'>
      <div className='px-4'>
        <Image preview={false} src='/assets/logo.svg' alt='Logo' />
      </div>

      <Dropdown
        trigger='click'
        menu={{ items: DROP_DOWN_ITEMS, onClick: handleSelectDropdownItem }}
      >
        <div className='flex p-4 justify-between items-center'>
          <div className='flex justify-between items-center'>
            <Avatar alt={displayName} src={photoURL} size={42} />

            <div className='ml-4'>
              <h2 className='text-base font-semibold'>{displayName}</h2>
              <h3 className='text-gray-500 text-sm'>{role}</h3>
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
        defaultSelectedKeys={['dashboard']}
        selectedKeys={[pathname.slice(1)]}
        items={NAV_ITEMS_BY_ROLE(role).filter(Boolean)}
      />
    </div>
  )
}
