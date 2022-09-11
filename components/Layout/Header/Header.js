import classes from './Header.module.css'
import Navigation from './Navigation'
import Notification from './Notification'
const Component = props => <header className={classes.header}>
  <Navigation/>
  <Notification/>
</header>
export default Component