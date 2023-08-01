import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  bag: {
    items: [],
    totalItems: 0,
    totalPayment: 0,
  },
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const {
        items: currentItems = [],
        totalItems = 0,
        totalPayment = 0,
      } = state.bag
      const { title = '', image = '', id = '', price = '' } = action.payload

      const bookIndex = currentItems.findIndex((item) => item.id === id)
      const existingBook = currentItems[bookIndex]

      if (existingBook) {
        // add one more
        currentItems[bookIndex] = {
          ...existingBook,
          quantity: existingBook.quantity + 1,
        }

        state.bag.items = [...currentItems]
      } else {
        currentItems.push({ id, title, image, price, quantity: 1 })
        state.bag.items = [...currentItems]
      }

      state.bag.totalItems = totalItems + 1
      state.bag.totalPayment = totalPayment + Number(price)
    },
    removeFromBag: (state, action) => {
      const {
        items: currentItems = [],
        totalItems = 0,
        totalPayment = 0,
      } = state.bag
      const { id = '', price = '' } = action.payload

      const bookIndex = currentItems.findIndex((item) => item.id === id)
      const existingBook = currentItems[bookIndex]

      if (existingBook && existingBook.quantity >= 2) {
        currentItems[bookIndex] = {
          ...existingBook,
          quantity: existingBook.quantity - 1,
        }

        state.bag.items = [...currentItems]
      } else {
        state.bag.items = [...currentItems].filter((item) => item.id !== id)
      }

      state.bag.totalItems = totalItems - 1
      state.bag.totalPayment = totalPayment - price
    },
    resetBag: (state) => {
      state.bag.items = []
      state.bag.totalItems = 0
      state.bag.totalPayment = 0
    },
  },
})

export const { addToBag, removeFromBag, resetBag } = librarySlice.actions

export const selectLibraryBag = createSelector(
  [(state) => state.library.bag],
  (bag) => bag
)

export default librarySlice.reducer
