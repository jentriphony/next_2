import {useState, useCallback, useContext, useEffect} from 'react'
import FetchContext from './../../context/fetch'
import {useSelector, useDispatch} from 'react-redux'
import {actions as pagesInitialSliceActions} from './../../redux/pages/initial'
const Hook = props => {
  const {urlTail, dataTail, actionSliceTail, pagesInitialSliceTail, sliceTail,
    configuration, sliceFetchAction, actionName, actionProps,
    onStart, onSuccess, onError, onFinish} = props
  const fetchContext = useContext(FetchContext)
  const pagesInitialSlice = useSelector(store => store.pagesInitial)
  const pagesInitialSliceWithTailHandler = useCallback(() => {
    const pagesInitialSliceTailArray = pagesInitialSliceTail.split('.')
    let pagesInitialSliceWithTail = pagesInitialSlice
    for(let iterator = 0; iterator < pagesInitialSliceTailArray.length; ++iterator)
      pagesInitialSliceWithTail = pagesInitialSliceWithTail[pagesInitialSliceTailArray[iterator]]
    return pagesInitialSliceWithTail
  }, [pagesInitialSliceTail, pagesInitialSlice])
  const [pagesInitialSliceWithTail, setPagesInitialSliceWithTail] = useState(pagesInitialSliceWithTailHandler())
  const dispatch = useDispatch()
  const sliceFetchActionOnFinish = useCallback(callbackProps => {
    dispatch(pagesInitialSliceActions.set({...callbackProps, sliceTail: pagesInitialSliceTail}))
    onFinish && onFinish(callbackProps)
  }, [dispatch, onFinish])
  useEffect(() => {
    !pagesInitialSliceWithTail && dispatch(sliceFetchAction({
      handler: fetchContext.handler, onStart, urlTail, configuration, dataTail,
      onSuccess, onError, onFinish: sliceFetchActionOnFinish, actionName, actionProps, actionSliceTail}))
  }, [pagesInitialSliceWithTail, dispatch, sliceFetchAction])
  const slice = useSelector(store => store[sliceTail])
  return {slice}
}
export default Hook