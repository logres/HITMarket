import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 'market'
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { changePage } = pageSlice.actions

export default pageSlice.reducer