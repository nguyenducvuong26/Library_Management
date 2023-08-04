import { Tabs } from 'antd'

import ChangePassword from './change-password'
import General from './general'

const PROFILE_TABS = [
  {
    key: 'general',
    label: `General`,
    children: <General />,
  },
  {
    key: 'change-password',
    label: `Change Password`,
    children: <ChangePassword />,
  },
]

export default function ProfileSection() {
  return <Tabs defaultActiveKey='general' size='large' items={PROFILE_TABS} />
}
