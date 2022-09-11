import {createSlice} from '@reduxjs/toolkit'
import {actions as uiLayoutHeaderNotificationSliceActions} from './../ui/layout-header-notification'
import pagesUrlsSlice from './urls'
const slice = createSlice({
  name: 'pagesList',
  initialState: {list: []},
  reducers: {
    set: (slice, props) => {
      if(props.payload.errorMessage) return
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]] = props.payload.data
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = props.payload.data
    },
    add: (slice, props) => {
      if(props.payload.errorMessage) return
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]].push(props.payload.data)
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]].push(props.payload.data)
    }
  }
})
export const fetchAction = props => {
  return async dispatch => {
    const onStart = () => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'loading',
        message: `list_fetch_${props.actionName}`
      }))
      props.onStart && props.onStart()
    }
    const onSuccess = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'success',
        message: `list_fetch_${props.actionName}`
      }))
      props.onSuccess && props.onSuccess(handlerProps)
    }
    const onError = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'error',
        message: `list_fetch_${props.actionName}:\n${handlerProps.errorMessage}`
      }))
      props.onError && props.onError(handlerProps)
    }
    const result = await props.handler({
      onStart,
      url: pagesUrlsSlice.getInitialState().fetch.list[props.urlTail],
      configuration: props.configuration,
      dataTail: props.dataTail,
      onSuccess,
      onError,
      onFinish: props.onFinish
    })
    return dispatch(slice.actions[props.actionName]({
      ...props.actionProps,
      ...result,
      sliceTail: props.actionSliceTail
    }))
  }
}
export const reducer = slice.reducer
export const actions = slice.actions
export default slice