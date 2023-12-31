import { useEffect, useRef, useState } from 'react'

import { FileImageOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Progress,
  Space,
  Upload,
  message,
} from 'antd'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import useRole from 'hooks/useRole'
import PropTypes from 'prop-types'

import { db, storage } from 'utils/firebase'
import { generateKeywords } from 'utils/generateKeywords'

const { Dragger } = Upload
const { Item, useForm } = Form
const { TextArea } = Input

LibraryForm.propTypes = {
  open: PropTypes.bool,
  selectedBook: PropTypes.object,
  onClose: PropTypes.func,
}

export function LibraryForm({ open, selectedBook, onClose }) {
  const submitButtonRef = useRef()
  const { isMemberRole = false, isAdminRole = false } = useRole()
  const [currentFile, setCurrentFile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [form] = useForm()

  const { setFieldValue } = form

  const { createdAt, id } = selectedBook || {}
  const isEdit = !!id

  const onFinish = async (data) => {
    const { title = '' } = data

    try {
      if (isEdit) {
        await updateDoc(doc(db, 'books', selectedBook.id), {
          ...data,
          image: currentFile,
          createdAt,
          updatedAt: serverTimestamp(),
          keywords: generateKeywords(title),
        })
      } else {
        await addDoc(collection(db, 'books'), {
          ...data,
          image: currentFile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          keywords: generateKeywords(title),
        })
      }
      onClose()
    } catch (error) {
      message.error(error?.message || 'Some thing went wrong!')
    }
  }

  const normFile = (e) => {
    if (!e?.fileList || !e?.fileList?.length) {
      setCurrentFile(null)
      return null
    }

    setCurrentFile(URL.createObjectURL(e?.file))

    const metadata = {
      contentType: 'image/jpeg',
    }

    const storageRef = ref(storage, `images/${e?.file?.name}`)
    const uploadTask = uploadBytesResumable(storageRef, e?.file, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(Math.ceil(progress))
      },
      (error) => {
        message.error(error?.message || 'Some thing went wrong!')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(null)
          setCurrentFile(downloadURL)
        })
      }
    )

    return e?.file?.name
  }

  useEffect(() => {
    if (!selectedBook) return

    const { title, description, price, numberInStock, image } = selectedBook

    setFieldValue('title', title)
    setFieldValue('description', description)
    setFieldValue('price', price)
    setFieldValue('numberInStock', numberInStock)
    setFieldValue('image', image)
    setCurrentFile(image)
  }, [selectedBook, setFieldValue])

  return (
    <Drawer
      title={`${isAdminRole ? `${isEdit ? 'Edit' : 'Add'}` : 'Detail'} Book`}
      open={open}
      onClose={onClose}
      closeIcon={false}
      size='large'
      extra={
        <Space>
          {isAdminRole && (
            <Button
              disabled={!!progress}
              type='primary'
              htmlType='submit'
              onClick={() => submitButtonRef.current.click()}
            >
              {isEdit ? 'Edit' : 'Add'}
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <Form
        layout='vertical'
        size='large'
        form={form}
        disabled={isMemberRole}
        onFinish={onFinish}
      >
        <Item
          label='Title'
          name='title'
          rules={[
            {
              required: true,
              message: 'Title is required',
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label='Price'
          name='price'
          initialvalues='0'
          rules={[
            {
              required: true,
              message: 'Price is required',
            },
          ]}
        >
          <InputNumber className='w-full' min='0' step='0.01' stringMode />
        </Item>

        <Item
          label='Number in stock'
          initialvalues='0'
          name='numberInStock'
          rules={[
            {
              required: true,
              message: 'Number in stock is required',
            },
            {
              pattern: '^[0-9]*$',
              message: 'Number in stock must be an integer',
            },
          ]}
        >
          <InputNumber
            className='w-full'
            size='large'
            min='0'
            step={1}
            stringMode
          />
        </Item>

        <Item
          label='Description'
          name='description'
          rules={[
            {
              required: true,
              message: 'Description is required',
            },
          ]}
        >
          <TextArea rows={4} />
        </Item>

        <Item
          label='Image'
          name='image'
          valuePropName='string'
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Image is required',
            },
          ]}
        >
          {progress && <Progress percent={progress} />}
          <Dragger
            name='image'
            multiple={false}
            maxCount={1}
            accept='image/png,image/jpeg,image/jpg'
            beforeUpload={() => false}
          >
            <div className='p-2'>
              {currentFile ? (
                <Image preview={false} src={currentFile} alt='preview' />
              ) : (
                <>
                  <p className='ant-upload-drag-icon'>
                    <FileImageOutlined />
                  </p>
                  <p className='ant-upload-text'>
                    Click or drag image file to this area to upload
                  </p>
                </>
              )}
            </div>
          </Dragger>
        </Item>

        <Button hidden ref={submitButtonRef} htmlType='submit' />
      </Form>
    </Drawer>
  )
}
