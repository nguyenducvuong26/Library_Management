import { Button, Form, Input } from 'antd'
import PropTypes from 'prop-types'

import { AUTH_FORM_TYPE } from '../config'

AuthForm.propTypes = {
  type: PropTypes.string,
}

export default function AuthForm({ type }) {
  const isSignInTab = AUTH_FORM_TYPE.SIGN_IN === type

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <div>
      <Form
        layout='vertical'
        size='large'
        style={{
          width: 436,
        }}
        onFinish={onFinish}
      >
        {!isSignInTab && (
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
            <Input styles={{ padding: '12px' }} />
          </Form.Item>
        )}

        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'Invalid email address',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {!isSignInTab && (
          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Password confirmation is required',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button className='w-full' type='primary' htmlType='submit'>
            {isSignInTab ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
