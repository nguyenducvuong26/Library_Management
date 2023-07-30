import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Image, Popconfirm, Typography, message } from 'antd'
import { deleteDoc, doc } from 'firebase/firestore'
import useRole from 'hooks/useRole'
import PropTypes from 'prop-types'

import { db } from 'utils/firebase'

const { Meta } = Card

BookItem.propTypes = {
  book: PropTypes.object,
  handleEditBook: PropTypes.func,
}

export default function BookItem({ book, handleEditBook }) {
  const { isAdminRole, isMemberRole } = useRole()

  const { id, title, description, price, numberInStock, image } = book

  const handleDeleteBook = async () => {
    try {
      await deleteDoc(doc(db, 'books', id))
    } catch (error) {
      message.error(error?.message || 'Some thing went wrong!')
    }
  }

  return (
    <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={<Image height={250} alt={title} src={image} />}
        className='h-full flex flex-col'
        bodyStyle={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        actions={[
          isMemberRole && (
            <div className='px-3 flex xs:flex-col justify-end flex-wrap items-center'>
              <Button
                type='primary'
                icon={<PlusCircleOutlined />}
                className='mt-2 mr-2 xs:w-full'
              >
                Add To Cart
              </Button>
              <Button type='default' className='mt-2 mr-2 xs:w-full'>
                Borrow
              </Button>
              <Button
                type='primary'
                className='mt-2 mr-2 xs:w-full'
                onClick={handleEditBook(book)}
              >
                View Detail
              </Button>
            </div>
          ),

          isAdminRole && (
            <div className='px-3 flex justify-end xs:flex-col'>
              <Button
                type='primary'
                icon={<EditOutlined />}
                className='mt-2 mr-2 xs:w-full'
                onClick={handleEditBook(book)}
              >
                Edit
              </Button>
              <Popconfirm
                icon={<QuestionCircleOutlined className='text-red-500' />}
                title='Delete the book'
                description='Are you sure to delete this book?'
                okText='Yes'
                cancelText='No'
                onConfirm={handleDeleteBook}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  className='mt-2 mr-2 xs:w-full'
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          ),
        ].filter(Boolean)}
      >
        <div className='flex flex-col justify-between flex-1'>
          <Meta
            title={title}
            description={
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                }}
              >
                {description}
              </Typography.Paragraph>
            }
          />

          <div>
            <p className='mb-0 font-semibold'>
              Number in stock: {numberInStock}
            </p>
            <p className='mb-0 font-semibold'>Price: {price}$</p>
          </div>
        </div>
      </Card>
    </Col>
  )
}
