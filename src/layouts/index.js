import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'

import Sidebar from './sidebar'
import { SIDEBAR_WIDTH } from './sidebar/config'

const { Sider, Content } = Layout

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider
        theme='light'
        breakpoint='lg'
        collapsedWidth='0'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={SIDEBAR_WIDTH}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#eeeeee',
        }}
        className="custom-sider"
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : SIDEBAR_WIDTH,
          transition: 'all 0.2s,background 0s',
        }}
      >
        <Content style={{ backgroundColor: '#ffffff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
