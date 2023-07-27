import { Row } from 'antd'
import PropTypes from 'prop-types'

import BookItem from './BookItem'

LibraryList.propTypes = {
  books: PropTypes.array,
  handleEditBook: PropTypes.func,
}

export default function LibraryList({ books, handleEditBook }) {
  return (
    <Row gutter={[24, 24]}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} handleEditBook={handleEditBook} />
      ))}
    </Row>
  )
}
