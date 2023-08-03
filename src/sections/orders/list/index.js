import { Table } from 'antd'
import useRole from 'hooks/useRole'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

OrderTableList.propTypes = {
  orders: PropTypes.array,
  handleChangeOrderStatus: PropTypes.func,
  handleOpenOrderDetail: PropTypes.func,
}

export default function OrderTableList({
  orders,
  handleChangeOrderStatus,
  handleOpenOrderDetail,
}) {
  const { isAdminRole = false } = useRole()

  return (
    <Table
      pagination={false}
      columns={GET_LIST_COLUMN({
        isAdminRole,
        handleChangeOrderStatus,
        handleOpenOrderDetail,
      })}
      dataSource={orders.map((order) => ({
        ...order,
        key: order.id,
        createdAt: new Date(order.createdAt.seconds * 1000).toLocaleString(),
      }))}
    />
  )
}
