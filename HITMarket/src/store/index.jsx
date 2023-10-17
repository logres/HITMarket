import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import counterReducer from '@/slices/counterSlice'
import pageReducer from '@/slices/pageSlice'


export const store = configureStore({
  // middleware: [thunkMiddleware],
  reducer: {
    counter: counterReducer,
    page: pageReducer,
  },
})