import classes from './Notification.module.css'
import {useCallback, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actions as uiLayoutHeaderNotificationSliceActions} from './../../../redux/ui/layout-header-notification'
import Spinner from './../../UI/Spinner'
const Component = props => {
  const uiLayoutHeaderNotificationSlice = useSelector(store => store.uiLayoutHeaderNotification)
  const dispatch = useDispatch()
  const visibilityHandler = useCallback(() => dispatch(uiLayoutHeaderNotificationSliceActions.set({
    visibility: null,
    status: null,
    message: null
  })), [dispatch])
  return <Fragment>
    {uiLayoutHeaderNotificationSlice.visible && <div className={classes.note}>
      <span>{uiLayoutHeaderNotificationSlice.status}</span>
      {uiLayoutHeaderNotificationSlice.status === 'loading' && <Spinner/>}
      <span>{uiLayoutHeaderNotificationSlice.message}</span>
      <button type='button' onClick={visibilityHandler}>x</button>
    </div>}
  </Fragment>
}
export default Component