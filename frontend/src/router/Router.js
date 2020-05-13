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

import AdminLogin from 'pages/admin/Login'
import AdminRegister from 'pages/admin/Register'
import AdminDashboard from 'pages/admin/Dashboard'
import AdminSettings from 'pages/admin/Settings'
import AdminBookingForms from 'pages/admin/BookingForms'
import AdminBookingForm from 'pages/admin/BookingForm'

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
        <Route segment="admin">
          <Route segment="login" exact>
            <AdminLogin />
          </Route>
          <Route segment="register" exact>
            <AdminRegister />
          </Route>
          <Route segment="dashboard" exact>
            <AdminDashboard />
          </Route>
          <Route segment="settings" exact>
            <AdminSettings />
          </Route>
          <Route segment="bookingforms">
            <Route segment="list" exact>
              <AdminBookingForms />
            </Route>
            <Route segment="edit" exact>
              <AdminBookingForm />
            </Route>
          </Route>
        </Route>
      </Layout>
    </RouteContext.Provider>
  )
}

export default Router