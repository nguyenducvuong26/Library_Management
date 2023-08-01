import { configureStore } from '@reduxjs/toolkit'

import libraryReducer from 'sections/library/librarySlice'

const store = configureStore({
  reducer: {
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export { store }
