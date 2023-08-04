import { useContext, useState } from 'react'

import { Alert, Button, Form, Input } from 'antd'
import { AuthContext } from 'context/auth'
import PropTypes from 'prop-types'

import { AUTH_FORM_TYPE } from '../config'

AuthForm.propTypes = {
  type: PropTypes.string,
}

export default function AuthForm({ type }) {
  const { login, register } = useContext(AuthContext)
  const [error, setError] = useState('')
  const isSignInTab = AUTH_FORM_TYPE.SIGN_IN === type

  const onFinish = async (values) => {
    try {
      const { name, email, password } = values

      if (isSignInTab) await login(email, password)
      else await register(name, email, password)
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
  }

  return (
    <>
      <Form
        layout='vertical'
        size='large'
        style={{
          width: 450,
          margin: 'auto',
        }}
        className='xs:w-full'
        onFinish={onFinish}
      >
        {error && (
          <div className='mb-3'>
            <Alert message={error} type='error' showIcon />
          </div>
        )}

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
            <Input />
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
            isSignInTab && {
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
                    new Error('The new password that you entered do not match')
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button className='w-full mt-4' type='primary' htmlType='submit'>
            {isSignInTab ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
