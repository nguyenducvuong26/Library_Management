import { useContext, useMemo, useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { AuthContext } from 'context/auth'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useDebounce } from 'hooks/useDebounce'
import useFirestore from 'hooks/useFirestore'
import useRole from 'hooks/useRole'

import { db } from 'utils/firebase'

import MemberTableList from './list'

MembersSection.propTypes = {}

export function MembersSection() {
  const { user = {} } = useContext(AuthContext)
  const { isAdminRole } = useRole()
  const { id: userId } = user || {}

  const q = useMemo(() => {
    if (isAdminRole)
      return query(collection(db, 'users'), orderBy('createdAt', 'desc'))
    return query(
      collection(db, 'users'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    )
  }, [isAdminRole, userId])
  const users = useFirestore(q)

  const [search, setSearch] = useState('')
  const searchValue = useDebounce(search, 500)

  const filteredUsers = useMemo(() => {
    if (!searchValue) return users
    return users.filter((user) =>
      user.displayName.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue, users])

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
      <MemberTableList users={filteredUsers} />
    </div>
  )
}
