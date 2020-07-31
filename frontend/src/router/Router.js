import React from 'react'
import { useSelector } from 'react-redux'
import Route from './Route'
import RouteContext from './RouteContext'
import Loading from 'components/system/Loading'

import routerSelectors from 'store/selectors/router'

import Layout from 'pages/Layout'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import Help from 'pages/Help'

import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Settings from 'pages/Settings'
import Items from 'pages/Items'
import Item from 'pages/Item'

const Router = ({

}) => {
  const route = useSelector(routerSelectors.route)

  if(!route) {
    return (
      <Loading />
    )
  }

  return (
    <RouteContext.Provider value={ route.name }>
      <Layout>
        <Route segment="notfound" exact>
          <NotFound />
        </Route>
        <Route segment="home" exact>
          <Home />
        </Route>
        <Route segment="help" exact>
          <Help />
        </Route>
        <Route segment="login" exact>
          <Login />
        </Route>
        <Route segment="logout" exact>
          <Logout />
        </Route>
        <Route segment="settings" exact>
          <Settings />
        </Route>
        <Route segment="items">
          <Route segment="list" exact>
            <Items />
          </Route>
          <Route segment="edit" exact>
            <Item />
          </Route>
        </Route>
      </Layout>
    </RouteContext.Provider>
  )
}

export default Router