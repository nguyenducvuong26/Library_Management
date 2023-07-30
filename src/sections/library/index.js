import { useMemo, useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useDebounce } from 'hooks/useDebounce'
import useFirestore from 'hooks/useFirestore'
import PropTypes from 'prop-types'

import { db } from 'utils/firebase'

import { LibraryForm } from './form'
import LibraryList from './list'

LibrarySection.propTypes = {
  isOpen: PropTypes.bool,
  selectedBook: PropTypes.object,
  handleEditBook: PropTypes.func,
  handleCloseForm: PropTypes.func,
}

export function LibrarySection({
  isOpen,
  selectedBook,
  handleEditBook,
  handleCloseForm,
}) {
  const [search, setSearch] = useState('')
  const searchValue = useDebounce(search, 300)

  const q = useMemo(
    () =>
      searchValue
        ? query(
            collection(db, 'books'),
            where('title', '==', searchValue),
            orderBy('updatedAt', 'desc')
          )
        : query(collection(db, 'books'), orderBy('updatedAt', 'desc')),
    [searchValue]
  )

  const books = useFirestore('books', q)

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

      {isOpen && (
        <LibraryForm
          open
          selectedBook={selectedBook}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
