import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/slices/counterSlice'
import pageReducer from '@/slices/pageSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    page: pageReducer,
  },
})