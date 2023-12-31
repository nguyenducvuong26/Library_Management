import { Table } from 'antd'
import useRole from 'hooks/useRole'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

LoanTableList.propTypes = {
  loans: PropTypes.array,
  handleChangeLoanStatus: PropTypes.func,
  handleOpenLoanDetail: PropTypes.func,
}

export default function LoanTableList({
  loans,
  handleChangeLoanStatus,
  handleOpenLoanDetail,
}) {
  const { isAdminRole = false } = useRole()

  return (
    <Table
      pagination={false}
      columns={GET_LIST_COLUMN({
        isAdminRole,
        handleChangeLoanStatus,
        handleOpenLoanDetail,
      })}
      dataSource={loans.map((loan) => ({
        ...loan,
        key: loan.id,
        createdAt: new Date(loan.createdAt.seconds * 1000).toLocaleString(),
        title: loan.items.map((item) => item.title).join(', '),
      }))}
    />
  )
}
