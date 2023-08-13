import { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Tabs } from 'antd'
import { AuthContext } from 'context/auth'

import ChangePassword from './change-password'
import General from './general'

const PROFILE_TABS = ({ hasPermission }) => [
  {
    key: 'general',
    label: `General`,
    children: <General />,
  },
  hasPermission && {
    key: 'change-password',
    label: `Change Password`,
    children: <ChangePassword />,
  },
]

export default function ProfileSection() {
  const { userId } = useParams()
  const { user = {} } = useContext(AuthContext)

  const hasPermission = userId === user.id

  return (
    <Tabs
      defaultActiveKey='general'
      size='large'
      items={PROFILE_TABS({ hasPermission }).filter(Boolean)}
    />
  )
}
