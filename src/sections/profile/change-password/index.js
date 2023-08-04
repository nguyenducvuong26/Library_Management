import { Button, Card, Form, Input, Space, message } from 'antd'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'

import { auth } from 'utils/firebase'

const { Item } = Form

export default function ChangePassword() {
  const onFinish = async (data) => {
    try {
      const { oldPassword, newPassword } = data || {}
      const { currentUser } = auth

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      )

      await reauthenticateWithCredential(currentUser, credential)

      await updatePassword(currentUser, newPassword)

      message.success('Update password success!')
    } catch (error) {
      console.log(error)
      message.error(error?.message || 'Something went wrong!')
    }
  }

  return (
    <Card>
      <Form layout='vertical' size='large' onFinish={onFinish}>
        <Item
          label='Old password'
          name='oldPassword'
          rules={[
            {
              required: true,
              message: 'Old password is required',
            },
          ]}
        >
          <Input.Password />
        </Item>
        <Item
          label='New password'
          name='newPassword'
          dependencies={['oldPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'New password is required',
            },
            {
              min: 8,
              message: 'New password must be at least 8 characters',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && getFieldValue('oldPassword') !== value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(
                    'The new password must be different from the old one'
                  )
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Item>
        <Item
          name='confirm'
          label='Confirm Password'
          dependencies={['newPpassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Password confirmation is required',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
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
        </Item>

        <Space className='flex justify-end'>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Space>
      </Form>
    </Card>
  )
}
