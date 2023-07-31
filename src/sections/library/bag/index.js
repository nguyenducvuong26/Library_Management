import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Alert,
  Button,
  Card,
  Drawer,
  Empty,
  Form,
  Radio,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import clsx from 'clsx'
import { AuthContext } from 'context/auth'
import { addDoc, collection } from 'firebase/firestore'
import PropTypes from 'prop-types'

import {
  addToBag,
  removeFromBag,
  resetBag,
  selectLibraryBag,
} from 'sections/library/librarySlice'

import { db } from 'utils/firebase'

import CheckOutForm from './CheckoutForm'
import { BAG_TYPE, GET_LIST_COLUMN } from './config'

LibraryBag.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export function LibraryBag({ open, onClose }) {
  const dispatch = useDispatch()
  const [type, setType] = useState(BAG_TYPE.BUY)
  const [isCheckout, setIsCheckout] = useState(false)
  const { user = {} } = useContext(AuthContext)
  const submitButtonRef = useRef()
  const [form] = Form.useForm()
  const { setFieldValue } = form

  const isBuyType = BAG_TYPE.BUY === type

  useEffect(() => {
    if (!user) return

    const { displayName, email, phone, address } = user

    setFieldValue('name', displayName)
    setFieldValue('email', email)
    setFieldValue('phone', phone)
    setFieldValue('address', address)
  }, [user, setFieldValue])

  const {
    items = [],
    totalItems = 0,
    totalPayment = 0,
  } = useSelector((state) => selectLibraryBag(state))

  const handleIncreaseQuantity = (book) => {
    dispatch(addToBag(book))
  }

  const handleDecreaseQuantity = (book) => {
    dispatch(removeFromBag(book))
  }

  const handleChangeBagType = (e) => {
    setType(e.target.value)
  }

  const handleCheckout = () => {
    setIsCheckout(true)
  }

  const handleCancelCheckout = () => {
    setIsCheckout(false)
  }

  const onFinish = async (data) => {
    try {
      if (isBuyType) {
        const orderData = {
          items,
          totalPayment,
          recipientInfor: data,
          userId: user.id,
        }

        await addDoc(collection(db, 'orders'), orderData)
        message.success('Order success!')
      } else {
        const borrowData = {
          items,
          dueDate: data.dueDate.format('YYYY-MM-DD'),
          userId: user.id,
        }

        await addDoc(collection(db, 'loans'), borrowData)
        message.success('Request borrow success!')
      }

      dispatch(resetBag())
      onClose()
    } catch (error) {
      console.log(error)
      message.error(error?.message || 'Something went wrong!')
    }
  }

  return (
    <Drawer
      title='Your Bag'
      open={open}
      closeIcon={false}
      onClose={onClose}
      size='large'
    >
      <Radio.Group className='mb-4' onChange={handleChangeBagType} value={type}>
        <Radio value={BAG_TYPE.BUY}>{BAG_TYPE.BUY}</Radio>
        <Radio value={BAG_TYPE.BORROW}>{BAG_TYPE.BORROW}</Radio>
      </Radio.Group>

      {Array.isArray(items) && items.length ? (
        <Table
          pagination={false}
          columns={GET_LIST_COLUMN({
            handleIncreaseQuantity,
            handleDecreaseQuantity,
            type,
          }).filter(Boolean)}
          dataSource={items.map((item) => ({ ...item, key: item.id }))}
          p-4
        />
      ) : (
        <Empty />
      )}

      <Space
        className={clsx('mt-6 flex flex-row  p-3', {
          'justify-between': type === BAG_TYPE.BUY,
          'justify-end': type === BAG_TYPE.BORROW,
        })}
      >
        <Typography>
          Total items:
          <strong className='ml-4'>{totalItems}</strong>
        </Typography>

        {isBuyType && (
          <Typography>
            Total payment:
            <strong className='ml-4'>${totalPayment.toFixed(2)}</strong>
          </Typography>
        )}
      </Space>

      {isCheckout && (
        <div className='mt-4 flex flex-col w-full space-y-4'>
          <Alert
            message={
              isBuyType
                ? 'Please double check the recipient information. You can go to profile setting to save your information'
                : 'Please select due date'
            }
            type='info'
            showIcon
          />

          <Card bodyStyle={{ padding: 16 }}>
            <Form
              layout='vertical'
              size='large'
              form={form}
              onFinish={onFinish}
            >
              <CheckOutForm isBuyType={isBuyType} />

              <Button hidden ref={submitButtonRef} htmlType='submit' />
            </Form>
          </Card>
        </div>
      )}

      <Space className='mt-6 flex flex-row justify-end'>
        <Button
          type='primary'
          disabled={!totalPayment}
          onClick={
            isCheckout ? () => submitButtonRef.current.click() : handleCheckout
          }
        >
          {isCheckout ? 'Done' : 'Checkout'}
        </Button>
        <Button onClick={isCheckout ? handleCancelCheckout : onClose}>
          Close
        </Button>
      </Space>
    </Drawer>
  )
}
