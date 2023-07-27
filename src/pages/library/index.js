import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'antd'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { LibrarySection } from 'sections/library'

export default function Library() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleAddNewBook = () => {
    setIsOpen(true)
  }

  const handleEditBook = (book) => () => {
    setIsOpen(true)
    setSelectedBook(book)
  }

  const handleCloseForm = () => {
    setIsOpen(false)
    setSelectedBook(null)
  }

  return (
    <div className='px-10 py-8'>
      <HeaderBreadcrumb
        heading='Library'
        items={[
          {
            title: <Link to={PATH_DASHBOARD.dashboard.root}>Dashboard</Link>,
            key: 'dashboard',
          },
          {
            title: 'Library',
            key: 'library',
          },
        ]}
        actions={
          <Button type='primary' onClick={handleAddNewBook}>
            Add New Book
          </Button>
        }
      />

      <LibrarySection
        isOpen={isOpen}
        selectedBook={selectedBook}
        handleEditBook={handleEditBook}
        handleCloseForm={handleCloseForm}
      />
    </div>
  )
}
