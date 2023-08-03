import { useMemo, useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useDebounce } from 'hooks/useDebounce'
import useFirestore from 'hooks/useFirestore'
import PropTypes from 'prop-types'

import { db } from 'utils/firebase'

import { LibraryBag } from './bag'
import { LibraryForm } from './form'
import LibraryList from './list'

LibrarySection.propTypes = {
  isOpenForm: PropTypes.bool,
  isOpenBag: PropTypes.bool,
  selectedBook: PropTypes.object,
  handleEditBook: PropTypes.func,
  handleCloseForm: PropTypes.func,
  handleCloseBag: PropTypes.func,
}

export function LibrarySection({
  isOpenForm,
  isOpenBag,
  selectedBook,
  handleEditBook,
  handleCloseForm,
  handleCloseBag,
}) {
  const [search, setSearch] = useState('')
  const searchValue = useDebounce(search, 500)

  const q = useMemo(
    () =>
      searchValue
        ? query(
            collection(db, 'books'),
            where('keywords', 'array-contains', searchValue),
            orderBy('updatedAt', 'desc')
          )
        : query(collection(db, 'books'), orderBy('updatedAt', 'desc')),
    [searchValue]
  )

  const books = useFirestore(q)

  return (
    <div className='pt-6'>
      <div className='mb-6'>
        <Input
          size='large'
          placeholder='Search book by title...'
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <LibraryList books={books} handleEditBook={handleEditBook} />

      {isOpenForm && (
        <LibraryForm
          open
          selectedBook={selectedBook}
          onClose={handleCloseForm}
        />
      )}

      {isOpenBag && <LibraryBag open onClose={handleCloseBag} />}
    </div>
  )
}
