import { Button, Select, Tag } from 'antd'

export const STATUS_TAG_COLOR = {
  Pending: 'blue',
  Shipping: 'yellow',
  Done: 'green',
  Cancel: 'red',
}

export const STATUS_OPTIONS = (orderId) => [
  { orderId, value: 'Pending', label: 'Pending' },
  { orderId, value: 'Shipping', label: 'Shipping' },
  { orderId, value: 'Done', label: 'Done' },
  { orderId, value: 'Cancel', label: 'Cancel' },
]

export const GET_LIST_COLUMN = ({
  isAdminRole,
  handleChangeOrderStatus,
  handleOpenOrderDetail,
}) => [
  {
    title: 'Order Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, { id = '' }) => <strong>#{id}</strong>,
  },
  {
    title: 'Order Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Total Items',
    dataIndex: 'totalItems',
    key: 'totalItems',
  },
  {
    title: 'Total Payment',
    dataIndex: 'totalPayment',
    key: 'totalPayment',
    render: (_, { totalPayment }) => totalPayment.toFixed(2),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { id = '', status = '' }) =>
      isAdminRole ? (
        <Select
          defaultValue={status}
          style={{ width: 100 }}
          onChange={handleChangeOrderStatus}
          options={STATUS_OPTIONS(id)}
        />
      ) : (
        <Tag color={STATUS_TAG_COLOR[status]}>{status}</Tag>
      ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <Button type='primary' onClick={handleOpenOrderDetail(record)}>
        Detail
      </Button>
    ),
  },
]
