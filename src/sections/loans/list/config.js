import { Button, Select, Tag } from 'antd'
import { format } from 'date-fns'

export const STATUS_TAG_COLOR = {
  Borrowed: 'blue',
  Pending: 'yellow',
  Expired: 'red',
  Cancel: 'green',
}

export const STATUS_OPTIONS = (loanId) => [
  { loanId, value: 'Pending', label: 'Pending' },
  { loanId, value: 'Expired', label: 'Expired' },
  { loanId, value: 'Borrowed', label: 'Borrowed' },
  { loanId, value: 'Cancel', label: 'Cancel' },
]

export const GET_LIST_COLUMN = ({
  isAdminRole,
  handleChangeLoanStatus,
  handleOpenLoanDetail,
}) => [
  {
    title: 'Borrow Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, { id = '' }) => <strong>#{id}</strong>,
  },
  {
    title: 'Book name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Borrow date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Due date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    render: (dueDate) => format(new Date(dueDate), 'dd/MM/yyyy'),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { id = '', status = '', dueDate }) => {
      const currentDate = new Date()
      const expiredDate = new Date(dueDate)

      if (status === 'Pending' && currentDate >= expiredDate) {
        handleChangeLoanStatus('Expired', { loanId: id })
      }

      return isAdminRole ? (
        <Select
          defaultValue={status}
          style={{ width: 100 }}
          onChange={(value) => handleChangeLoanStatus(value, { loanId: id })}
          options={STATUS_OPTIONS(id)}
        />
      ) : (
        <Tag color={STATUS_TAG_COLOR[status]}>{status}</Tag>
      )
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <Button type='primary' onClick={handleOpenLoanDetail(record)}>
        Detail
      </Button>
    ),
  },
]
