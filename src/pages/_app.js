import '@/styles/globals.css'
import { SessionProvider  } from 'next-auth/react'
import { store } from '../app/store'
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }) {
  return (
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
  )
  
  
}
