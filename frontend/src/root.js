import React from 'react'
import { Provider } from 'react-redux'

import Theme from './theme'
import App from './app'

const Root = ({
  store,
  router,
}) => {
  return (
    <Provider store={ store }>
      <Theme>
        <App
          router={ router }
        />
      </Theme>
    </Provider>
  )
}

export default Root
