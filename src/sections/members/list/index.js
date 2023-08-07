import { Table } from 'antd'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

MemberTableList.propTypes = {
  users: PropTypes.array,
  handleProfileClick: PropTypes.func,
}

export default function MemberTableList({ users, handleProfileClick }) {
  return (
    <Table
      pagination={false}
      columns={GET_LIST_COLUMN({ handleProfileClick })}
      dataSource={users.map((user) => ({
        ...user,
        key: user.id,
      }))}
    />
  )
}
