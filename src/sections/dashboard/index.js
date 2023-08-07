import ReactApexChart from 'react-apexcharts'

import { Card, Col, Row } from 'antd'

import { CHART_OPTIONS } from './config'

export default function DashboardSection() {
  return (
    <div className='pt-6'>
      <Row gutter={[24, 24]}>
        <Col className='gutter-row' span={24} style={{ height: '600px' }}>
          <Card className='h-full' bodyStyle={{ height: '100%' }}>
            <ReactApexChart
              height='100%'
              type='bar'
              options={CHART_OPTIONS}
              series={[
                {
                  name: 'Visitors',
                  data: [76, 85, 101, 98, 87, 105, 91, 114],
                },
                {
                  name: 'Orders',
                  data: [44, 55, 57, 56, 61, 58, 63, 60],
                },
                {
                  name: 'Borrows',
                  data: [35, 41, 36, 26, 45, 48, 52, 53],
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
