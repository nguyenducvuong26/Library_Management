import { Table } from 'antd'
import PropTypes from 'prop-types'

import { GET_LIST_COLUMN } from './config'

MemberTableList.propTypes = {
  users: PropTypes.array,
}

export default function MemberTableList({ users }) {
  return (
    <Table
      pagination={false}
      columns={GET_LIST_COLUMN()}
      dataSource={users.map((user) => ({
        ...user,
        key: user.id,
      }))}
    />
  )
}
