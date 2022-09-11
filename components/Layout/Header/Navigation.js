import classes from './Navigation.module.css'
import {useSelector} from 'react-redux'
import Link from 'next/link'
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  return <nav className={classes.nav}>
    <ul>
      <li>
        <Link href={pagesPathsSlice.list.list}>
          list
        </Link>
      </li>
      <li>
        <Link href={pagesPathsSlice.list.add}>
          add
        </Link>
      </li>
    </ul>
  </nav>
}
export default Component