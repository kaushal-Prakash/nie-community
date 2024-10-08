import React from 'react'
import {Header, Footer,Secure} from './components/components'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './store/store'
import Intro from './pages/Intro'

function Layout() {
  return (
    <Provider store={store}>
      <Header/>
      <Intro/>
      <Outlet />
      <Footer />
    </Provider>
  )
}

export default Layout