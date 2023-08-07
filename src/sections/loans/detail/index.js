import { Drawer, Table } from 'antd'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

DetailLoan.propTypes = {
  open: PropTypes.bool,
  loan: PropTypes.object,
  onClose: PropTypes.func,
}

export default function DetailLoan({ open = false, loan, onClose }) {
  const { id = '', items = [] } = loan || {}

  return (
    <Drawer
      title={`Detail Loan #${id}`}
      size='large'
      open={open}
      closeIcon={false}
      onClose={onClose}
    >
      <Table
        pagination={false}
        columns={GET_LIST_COLUMN()}
        dataSource={items.map((item) => ({ ...item, key: item.id }))}
      />
    </Drawer>
  )
}
