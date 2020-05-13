import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router5'
import Loading from 'components/system/Loading'

import authSelectors from 'store/selectors/auth'
import authActions from 'store/modules/auth'

import Router from './router/Router'

const App = ({
  router,
}) => {
  const dispatch = useDispatch()
  const loaded = useSelector(authSelectors.loaded)
  
  useEffect(() => {
    const initialise = async () => {
      await dispatch(authActions.initialise())
      console.log('starting router')
      router.start()
    }
    initialise()
  }, [])

  if(!loaded) {
    return (
      <Loading />
    )
  }

  return (
    <RouterProvider router={ router }>
      <Router />
    </RouterProvider>
  )
}

export default App
