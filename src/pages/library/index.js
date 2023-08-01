import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PlusCircleOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import useRole from 'hooks/useRole'

import { HeaderBreadcrumb } from 'components/HeaderBreadcrumb'

import { PATH_DASHBOARD } from 'routes/paths'

import { LibrarySection } from 'sections/library'
import { selectLibraryBag } from 'sections/library/librarySlice'

export default function Library() {
  const { isMemberRole = false, isAdminRole = false } = useRole()
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isOpenBag, setIsOpenBag] = useState(false)

  const { totalItems = 0 } = useSelector((state) => selectLibraryBag(state))

  const handleAddNewBook = () => {
    setIsOpenForm(true)
  }

  const handleEditBook = (book) => () => {
    setIsOpenForm(true)
    setSelectedBook(book)
  }

  const handleCloseForm = () => {
    setIsOpenForm(false)
    setSelectedBook(null)
  }

  const handleOpenBag = () => {
    setIsOpenBag(true)
  }

  const handleCloseBag = () => {
    setIsOpenBag(false)
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
                  <Badge count={totalItems} size='small'>
                    <ShoppingOutlined className='text-white' />
                  </Badge>
                }
                onClick={handleOpenBag}
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
        isOpenForm={isOpenForm}
        isOpenBag={isOpenBag}
        selectedBook={selectedBook}
        handleEditBook={handleEditBook}
        handleCloseForm={handleCloseForm}
        handleCloseBag={handleCloseBag}
      />
    </div>
  )
}
