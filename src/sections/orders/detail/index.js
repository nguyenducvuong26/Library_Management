import { useEffect } from 'react'

import { Card, Drawer, Form, Space, Table, Typography } from 'antd'
import PropTypes from 'prop-types'

import CheckOutForm from 'sections/library/bag/CheckoutForm'

import { GET_LIST_COLUMN } from './config'

DetailOrder.propTypes = {
  open: PropTypes.bool,
  order: PropTypes.object,
  onClose: PropTypes.func,
}

export default function DetailOrder({ open = false, order, onClose }) {
  const [form] = Form.useForm()
  const { setFieldValue } = form

  const {
    id = '',
    items = [],
    totalItems = 0,
    totalPayment = 0,
    recipientInfor = {},
  } = order || {}

  useEffect(() => {
    const { name = '', email = '', phone = '', address = '' } = recipientInfor

    setFieldValue('name', name)
    setFieldValue('email', email)
    setFieldValue('phone', phone)
    setFieldValue('address', address)
  }, [setFieldValue, recipientInfor])

  return (
    <Drawer
      title={`Detail Order #${id}`}
      size='large'
      open={open}
      closeIcon={false}
      onClose={onClose}
    >
      <Table
        pagination={false}
        columns={GET_LIST_COLUMN()}
        dataSource={items.map((item) => ({ ...item, key: item.id }))}
      />

      <Space className='mt-6 flex flex-row p-3 justify-between'>
        <Typography>
          Total items:
          <strong className='ml-4'>{totalItems}</strong>
        </Typography>
        <Typography>
          Total payment:
          <strong className='ml-4'>${totalPayment.toFixed(2)}</strong>
        </Typography>
      </Space>

      <Card className="mt-4" bodyStyle={{ padding: 16 }}>
        <Form layout='vertical' size='large' form={form} disabled>
          <CheckOutForm isBuyType />
        </Form>
      </Card>
    </Drawer>
  )
}
