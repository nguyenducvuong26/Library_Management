import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { DownOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Image, Menu } from 'antd'
import { AuthContext } from 'context/auth'

import { PATH_DASHBOARD } from 'routes/paths'

import { DROP_DOWN_ITEMS, NAV_ITEMS_BY_ROLE } from './config'

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logout, user } = useContext(AuthContext)

  const { id = '', role = '', photoURL = '', displayName = '' } = user || {}

  const handleSelectDropdownItem = (e) => {
    const { key = '' } = e || {}

    switch (key) {
      case 'profile': {
        navigate(PATH_DASHBOARD.profile.view(id))
        break
      }
      case 'logout': {
        logout()
        break
      }
      default:
        break
    }
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

            <div className='ml-2'>
              <h2 className='text-sm font-semibold mb-0'>{displayName}</h2>
              <h3 className='text-gray-500 text-xs mb-0'>{role}</h3>
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
