// import { useMemo } from 'react'
import { useContext, useMemo, useState } from 'react'

import { message } from 'antd'
import { AuthContext } from 'context/auth'
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import useFirestore from 'hooks/useFirestore'
import useRole from 'hooks/useRole'

import { db } from 'utils/firebase'

import DetailOrder from './detail'
import OrderTableList from './list'

OrdersSection.propTypes = {}

export function OrdersSection() {
  const { user = {} } = useContext(AuthContext)
  const { isAdminRole } = useRole()
  const { id: userId } = user || {}

  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState(null)

  const handleOpenOrderDetail = (order) => () => {
    setIsOpen(true)
    setOrder(order)
  }

  const handleCloseOrderDetail = () => {
    setIsOpen(false)
    setOrder(null)
  }

  const handleChangeOrderStatus = async (value, option) => {
    try {
      await updateDoc(doc(db, 'orders', option.orderId), {
        status: value,
        updatedAt: serverTimestamp(),
      })
      message.success(
        `Successfully changed order status #${option.orderId} into ${value}`
      )
    } catch (error) {
      console.log(error)
      message.error(error?.message || 'Something went wrong!')
    }
  }

  const q = useMemo(() => {
    if (isAdminRole)
      return query(collection(db, 'orders'), orderBy('createdAt', 'desc'))

    return query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )
  }, [isAdminRole, userId])

  const orders = useFirestore(q)

  return (
    <div className='pt-6'>
      <OrderTableList
        orders={orders}
        handleChangeOrderStatus={handleChangeOrderStatus}
        handleOpenOrderDetail={handleOpenOrderDetail}
      />

      {isOpen && (
        <DetailOrder open order={order} onClose={handleCloseOrderDetail} />
      )}
    </div>
  )
}
