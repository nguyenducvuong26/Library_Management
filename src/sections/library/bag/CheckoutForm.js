import { DatePicker, Form, Input } from 'antd'
import PropTypes from 'prop-types'

CheckOutForm.propTypes = {
  isBuyType: PropTypes.bool,
}

export default function CheckOutForm({ isBuyType = false }) {
  return (
    <>
      {isBuyType ? (
        <>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone number'
            name='phone'
            rules={[
              {
                required: true,
                message: 'Phone is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Address'
            name='address'
            rules={[
              {
                required: true,
                message: 'Address is required',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      ) : (
        <Form.Item
          label='Due date'
          name='dueDate'
          rules={[
            {
              required: true,
              message: 'Due date is required',
            },
          ]}
        >
          <DatePicker className='w-full' />
        </Form.Item>
      )}
    </>
  )
}
