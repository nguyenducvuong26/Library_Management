import { Link } from 'react-router-dom'

import { PATH_DASHBOARD } from 'routes/paths'

export const GET_LIST_COLUMN = ({ handleProfileClick }) => [
  {
    title: 'Name',
    dataIndex: 'displayName',
    key: 'displayName',
    render: (_, { id, displayName }) => (
      <Link
        className='text-black font-semibold hover:text-blue-500'
        onClick={() => handleProfileClick(id)}
        to={PATH_DASHBOARD.profile.view(id)}
      >
        {displayName}
      </Link>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
]
