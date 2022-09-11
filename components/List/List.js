import classes from './List.module.css'
import {useEffect, Fragment} from 'react'
// import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {actions as pagesInitialSliceActions} from './../../redux/pages/initial'
import {actions as pagesListSliceActions} from './../../redux/pages/list'
// import {fetchAction as sliceFetchAction} from './../../redux/pages/list'
// import usePagesInitialFetch from './../../hooks/pages/initial-fetch'
import NotFound from './../UI/NotFound'
import Item from './Item/Item'
const Component = props => {
  // const slice = usePagesInitialFetch({
  //   urlTail: 'list', actionSliceTail: 'list', pagesInitialSliceTail: 'fetch.list.list', sliceTail: 'pagesList',
  //   sliceFetchAction, actionName: 'set'}).slice
  // const pagesInitialSlice = useSelector(store => store.pagesInitial)
  const {list} = props
  const dispatch = useDispatch()
  useEffect(() => {
    if(list && list.length > 0) {
      dispatch(pagesInitialSliceActions.set({sliceTail: 'fetch.list.list'}))
      dispatch(pagesListSliceActions.set({data: list, sliceTail: 'list'}))
    } else dispatch(pagesInitialSliceActions.set({errorMessage: 'error_fetch'}))
  }, [dispatch, list])
  return <Fragment>
    {list && list.length > 0 ? <ul className={classes.list}>
      {list.map(item => <Item key={item.id} item={item}/>)}
    </ul> : <NotFound target='list'/>}
    {/* {slice.list.length > 0 ? <ul className={classes.list}>
      {slice.list.map(item => <Item key={item.id} item={item}/>)}
    </ul> : pagesInitialSlice.fetch.list.list === false && <NotFound target='list'/>} */}
  </Fragment>
}
export default Component