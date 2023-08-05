import { Select, Tag } from 'antd'
import { format } from 'date-fns'

export const STATUS_TAG_COLOR = {
  Borrowing: 'blue',
  Done: 'green',
  Expired: 'red',
}

export const STATUS_OPTIONS = (loanId) => [
  { loanId, value: 'Done', label: 'Done' },
  { loanId, value: 'Expired', label: 'Expired' },
  { loanId, value: 'Borrowing', label: 'Borrowing' },
]

export const GET_LIST_COLUMN = ({ isAdminRole, handleChangeLoanStatus }) => [
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
    render: (dueDate) => format(new Date(dueDate), 'dd/MM/yy'),
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
          onChange={(value) => handleChangeLoanStatus(value, { loanId: id })}
          options={STATUS_OPTIONS(id)}
        />
      ) : (
        <Tag color={STATUS_TAG_COLOR[status]}>{status}</Tag>
      ),
  },
]
