import classes from './../UI/Card.module.css'
import Header from './Header/Header'
const Layout = props => <section className={classes.card}>
  <Header/>
  <main className={classes.card}>
    {props.children}
  </main>
</section>
export default Layout