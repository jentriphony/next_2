import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesInitial',
  initialState: {fetch: {list: {list: null}}},
  reducers: {
    set: (slice, props) => {
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1)
        if(props.payload.errorMessage) {
          slice[sliceTailArray[0]] = false
          return
        } else {
          slice[sliceTailArray[0]] = true
          return
        }
      else {
        let sliceWithTail = slice
        for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
          sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
        if(props.payload.errorMessage) {
          sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = false
          return
        }
        sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = true
      }
    }
  }
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice