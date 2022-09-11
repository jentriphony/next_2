import '../styles/globals.css'
import {Provider as FetchContextProvider} from './../context/fetch'
import {Provider as ReduxProvider} from 'react-redux'
import store from './../redux/index'
import Layout from './../components/Layout/Layout'
const MyApp = ({Component, pageProps}) => <FetchContextProvider>
  <ReduxProvider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ReduxProvider>
</FetchContextProvider>
export default MyApp
