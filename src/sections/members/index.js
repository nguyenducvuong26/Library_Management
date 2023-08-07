import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useDebounce } from 'hooks/useDebounce'
import useFirestore from 'hooks/useFirestore'

import { PATH_DASHBOARD } from 'routes/paths'

import { db } from 'utils/firebase'

import MemberTableList from './list'

MembersSection.propTypes = {}

export function MembersSection() {
  const q = useMemo(
    () =>
      query(
        collection(db, 'users'),
        where('role', '==', 'Member'),
        orderBy('createdAt', 'desc')
      ),
    []
  )
  const users = useFirestore(q)

  const [search, setSearch] = useState('')
  const searchValue = useDebounce(search, 500)

  const filteredUsers = useMemo(() => {
    if (!searchValue) return users
    return users.filter((user) =>
      user.displayName.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue, users])

  const navigate = useNavigate()

  const handleProfileClick = (userId) => {
    navigate(PATH_DASHBOARD.profile.view(userId))
  }
  return (
    <div className='pt-6'>
      <div className='mb-6'>
        <Input
          size='large'
          placeholder='Search user by name...'
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MemberTableList
        users={filteredUsers}
        handleProfileClick={handleProfileClick}
      />
    </div>
  )
}
