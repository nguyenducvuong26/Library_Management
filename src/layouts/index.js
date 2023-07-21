import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'

import Sidebar from './sidebar'
import { SIDEBAR_WIDTH } from './sidebar/config'

const { Sider, Content } = Layout

export default function MainLayout() {
  return (
    <Layout>
      <Sider
        width={SIDEBAR_WIDTH}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#eeeeee',
        }}
      >
        <Sidebar />
      </Sider>
      <Layout
        style={{
          marginLeft: SIDEBAR_WIDTH,
        }}
      >
        <Content style={{ backgroundColor: '#ffffff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
