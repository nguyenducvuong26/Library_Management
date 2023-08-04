import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  EditFilled,
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Space,
  Upload,
  message,
} from 'antd'
import { AuthContext } from 'context/auth'
import { deleteUser } from 'firebase/auth'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import useRole from 'hooks/useRole'

import { PATH_DASHBOARD } from 'routes/paths'

import { auth, db, storage } from 'utils/firebase'

const { Item, useForm } = Form

export default function General() {
  const navigate = useNavigate()
  const { isAdminRole = false } = useRole()
  const { user = {}, updateUser, logout } = useContext(AuthContext)
  const { userId = '' } = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const canEdit = userId === user.id

  const [form] = useForm()
  const { setFieldValue } = form

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = (await getDoc(doc(db, 'users', userId))).data()
        const { displayName, email, phone, address, photoURL } = user

        setFieldValue('displayName', displayName)
        setFieldValue('email', email)
        setFieldValue('phone', phone)
        setFieldValue('address', address)
        setImageFile(photoURL)
      } catch (error) {
        message.error(error?.message || 'Failed to get user data!')
      }
    }

    if (canEdit) {
      const { displayName, email, phone, address, photoURL } = user

      setFieldValue('displayName', displayName)
      setFieldValue('email', email)
      setFieldValue('phone', phone)
      setFieldValue('address', address)
      setImageFile(photoURL)
    } else {
      getCurrentUser()
    }
  }, [canEdit, setFieldValue, user, userId])

  const handleChangeImage = (e) => {
    setImageFile(URL.createObjectURL(e?.file))

    const metadata = {
      contentType: 'image/jpeg',
    }

    const storageRef = ref(storage, `images/${e?.file?.name}`)
    const uploadTask = uploadBytesResumable(storageRef, e?.file, metadata)

    setIsUploading(true)

    uploadTask.on(
      'state_changed',
      () => null,
      (error) => {
        message.error(error?.message || 'Some thing went wrong!')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateUser({ photoURL: downloadURL, userId })
          setImageFile(downloadURL)
          setIsUploading(false)
        })
      }
    )
  }

  const onFinish = async (data) => {
    try {
      await updateUser({ ...data, userId })

      message.success('Update information success!')
    } catch (error) {
      message.error(error?.message || 'Some thing went wrong!')
    }
  }

  const handleCloseAccount = async () => {
    try {
      await deleteUser(auth.currentUser)
      await deleteDoc(doc(db, 'users', userId))

      if (canEdit) {
        logout()
      } else {
        navigate(PATH_DASHBOARD.members.root)
      }
    } catch (error) {
      console.log(error)
      message.error(error?.message || 'Some thing went wrong!')
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col className='gutter-row' span={8}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card className='flex justify-center items-center'>
              <Upload
                name='avatar'
                listType='picture-circle'
                className='avatar-uploader custom-upload-size'
                multiple={false}
                maxCount={1}
                showUploadList={false}
                accept='image/png,image/jpeg,image/jpg'
                onChange={handleChangeImage}
                beforeUpload={() => false}
              >
                {imageFile ? (
                  <Image
                    src={imageFile}
                    alt='avatar'
                    preview={false}
                    className='h-32 w-32 rounded-full'
                  />
                ) : (
                  <div>
                    {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className='mt-2'>Change Avatar</div>
                  </div>
                )}
              </Upload>
            </Card>
          </Col>

          {(isAdminRole || canEdit) && (
            <Col span={24}>
              <Alert
                className='flex-col space-y-4'
                message='Close Account'
                description='You can permanently delete this account.'
                type='info'
                action={
                  <Popconfirm
                    icon={<QuestionCircleOutlined className='text-red-500' />}
                    title='Delete this account'
                    description='Are you sure to delete this account permanently?'
                    okText='Yes'
                    cancelText='No'
                    onConfirm={handleCloseAccount}
                  >
                    <Button size='large' type='primary'>
                      Close Account
                    </Button>
                  </Popconfirm>
                }
              />
            </Col>
          )}
        </Row>
      </Col>

      <Col className='gutter-row' span={16}>
        <Card>
          {canEdit && (
            <Button icon={<EditFilled />} onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}

          <Form
            layout='vertical'
            size='large'
            form={form}
            disabled={!isEdit}
            onFinish={onFinish}
          >
            <Item
              label='Display name'
              name='displayName'
              rules={[
                {
                  required: true,
                  message: 'Display name is required',
                },
              ]}
            >
              <Input />
            </Item>

            <Item
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
            </Item>

            <Item
              label='Phone number'
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Phone number is required',
                },
              ]}
            >
              <Input />
            </Item>

            <Item
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
            </Item>

            <Space className='flex justify-end space-x-2'>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            </Space>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
