import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesUrls',
  initialState: {fetch: {list: {list: '/api/list', item: '', add: '/api/add'}}},
  reducers: {}
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice