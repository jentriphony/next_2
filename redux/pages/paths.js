import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesPaths',
  initialState: {list: {list: '/list', item: '/item', add: '/add'}},
  reducers: {}
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice