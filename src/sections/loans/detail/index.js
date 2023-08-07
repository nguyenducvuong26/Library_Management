import { Drawer, Space, Table, Typography } from 'antd'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

DetailLoan.propTypes = {
  open: PropTypes.bool,
  loan: PropTypes.object,
  onClose: PropTypes.func,
}

export default function DetailLoan({ open = false, loan, onClose }) {
  const { id = '', items = [], totalItems = 0, totalPayment = 0 } = loan || {}

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

      <Space className='mt-6 flex flex-row p-3 justify-between'>
        <Typography>
          Total items:
          <strong className='ml-4'>{totalItems}</strong>
        </Typography>
        <Typography>
          Total payment:
          <strong className='ml-4'>${totalPayment.toFixed(2)}</strong>
        </Typography>
      </Space>
    </Drawer>
  )
}
