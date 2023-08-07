import { Link } from 'react-router-dom'

import { PATH_DASHBOARD } from 'routes/paths'

export const GET_LIST_COLUMN = ({ handleProfileClick }) => [
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
    render: (_, { id, displayName }) => (
      <Link
        className='text-black font-bold'
        onClick={() => handleProfileClick(id)}
        to={PATH_DASHBOARD.profile.view(id)}
      >
        {displayName}
      </Link>
    ),
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
]
