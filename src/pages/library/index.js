import { useState } from 'react'
import { Link } from 'react-router-dom'

import { PlusCircleOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import useRole from 'hooks/useRole'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { LibrarySection } from 'sections/library'

export default function Library() {
  const { isMemberRole = false, isAdminRole = false } = useRole()
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
          <>
            {isMemberRole && (
              <Button
                type='primary'
                icon={
                  <Badge count={2} size='small'>
                    <ShoppingOutlined className='text-white' />
                  </Badge>
                }
              >
                Your Bag
              </Button>
            )}

            {isAdminRole && (
              <Button
                type='primary'
                icon={<PlusCircleOutlined />}
                onClick={handleAddNewBook}
              >
                Add New Book
              </Button>
            )}
          </>
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
