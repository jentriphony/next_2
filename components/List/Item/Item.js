import classes from './Item.module.css'
import {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
const Component = props => {
  const id = props.item.id
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const routerHook = useRouter()
  const pageButtonHandler = useCallback(() => routerHook.push(`${pagesPathsSlice.list.item}/${id}`), [routerHook, pagesPathsSlice, id])
  return <li className={classes.item}>
    <div className={classes.image}>
      <img src={props.item.image} alt={props.item.title}/>
    </div>
    <div className={classes.content}>
      <span>{props.item.title}</span>
      <address>{props.item.address}</address>
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={pageButtonHandler}>
        page
      </button>
    </div>
  </li>
}
export default Component