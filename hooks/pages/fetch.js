import {useCallback, useContext} from 'react'
import FetchContext from './../../context/fetch'
import {useSelector, useDispatch} from 'react-redux'
const Hook = props => {
  const {urlTail, dataTail, actionSliceTail, sliceTail,
    configuration, sliceFetchAction, actionName, actionProps,
    onStart, onSuccess, onError, onFinish} = props
  const fetchContext = useContext(FetchContext)
  const dispatch = useDispatch()
  const handler = useCallback(() => dispatch(sliceFetchAction({
    handler: fetchContext.handler, onStart, urlTail, configuration, dataTail,
    onSuccess, onError, onFinish, actionName, actionProps, actionSliceTail})), [
      dispatch, sliceFetchAction, fetchContext, onStart, urlTail, configuration,
      dataTail, onSuccess, onError, onFinish, actionName, actionProps, actionSliceTail])
  const slice = useSelector(store => store[sliceTail])
  return {handler, slice}
}
export default Hook