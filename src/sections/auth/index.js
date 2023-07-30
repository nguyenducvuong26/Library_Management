import { useState } from 'react'

import { Tabs } from 'antd'

import AuthBanner from './Banner'
import { AUTH_FORM_TYPE } from './config'
import AuthForm from './form'

const AUTH_TABS = [
  {
    key: AUTH_FORM_TYPE.SIGN_IN,
    label: `SIGN IN`,
    children: <AuthForm type={AUTH_FORM_TYPE.SIGN_IN} />,
  },
  {
    key: AUTH_FORM_TYPE.SIGN_UP,
    label: `SIGN UP`,
    children: <AuthForm type={AUTH_FORM_TYPE.SIGN_UP} />,
  },
]

export default function AuthSection() {
  const [tab, setTab] = useState(AUTH_FORM_TYPE.SIGN_IN)

  return (
    <div className='flex items-center h-screen'>
      <AuthBanner tab={tab} />

      <div className='w-full flex flex-col items-center justify-center'>
        <Tabs
          className='w-full p-6 flex justify-center'
          tabBarStyle={{ margin: '0 auto 24px', padding: '0 4px' }}
          defaultActiveKey={AUTH_FORM_TYPE.SIGN_IN}
          size='large'
          items={AUTH_TABS}
          onChange={(key) => setTab(key)}
        />
      </div>
    </div>
  )
}
