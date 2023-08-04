import {
  AppstoreOutlined,
  BankOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { PAGES, ROLE_BY_PAGE } from 'config'

export const SIDEBAR_WIDTH = 238

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

export const NAV_ITEMS_BY_ROLE = (role) =>
  NAV_ITEMS_CONFIG.map(
    ({ label, key, icon, roles }) =>
      roles.includes(role) && getItem(label, key, icon)
  )

export const DROP_DOWN_ITEMS = [
  {
    key: 'profile',
    label: 'Profile',
  },
  {
    key: 'logout',
    label: 'Log out',
  },
]
