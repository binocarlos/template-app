import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'

import Theme from './theme'
import Router from './router/Router'

class Root extends React.Component {
  render() {

    const {
      store,
      router,
    } = this.props

    return (
      <Provider store={ store }>
        <Theme>
          <RouterProvider router={ router }>
            <Router />
          </RouterProvider>
        </Theme>
      </Provider>
    )
  }
}

export default Root
