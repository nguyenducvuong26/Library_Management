import { collection, orderBy, query } from 'firebase/firestore'
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
  const books = useFirestore(
    'books',
    query(collection(db, 'books'), orderBy('updatedAt', 'desc'))
  )

  return (
    <div className='pt-6'>
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
