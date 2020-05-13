import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import SideMenu from 'components/layout/SideMenu'
import AppBarMenu from 'components/layout/AppBarMenu'
import Snackbar from 'components/system/Snackbar'
import GlobalLoading from 'components/system/GlobalLoading'

import authSelectors from 'store/selectors/auth'
import networkSelectors from 'store/selectors/network'
import routerSelectors from 'store/selectors/router'

import {
  PUBLIC_MENU,
  ADMIN_GUEST_MENU,
  ADMIN_USER_MENU,
} from 'settings'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  appbar: {
    flexGrow: 1,
    flex: 1,
  },
  toolbar: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  flex: {
    flex: 1,
  },
  content: {
    height: 'calc(100% - 64px)'
  }
}))

const Layout = ({
  children,
}) => {
  const classes = useStyles()

  const route = useSelector(routerSelectors.route)
  const user = useSelector(authSelectors.data)
  const globalLoading = useSelector(networkSelectors.globalLoading)

  let MENU = PUBLIC_MENU

  if(route.name.indexOf('admin.') == 0) {
    MENU = user ?
      ADMIN_USER_MENU :
      ADMIN_GUEST_MENU
  }

  return (
    <div className={ classes.root }>
      <div className={ classes.appbar }>
        <AppBar position="static">
          <Toolbar className={ classes.toolbar }>
            <SideMenu 
              items={ MENU }
            />
            <Typography 
              variant="h6" 
              color="inherit" 
              className={ classes.flex }
            >
              My App
            </Typography>
            <AppBarMenu
              items={ MENU }
            />
          </Toolbar>
        </AppBar>
      </div>
      <div className={ classes.content }>
        { children }
      </div>
      <GlobalLoading
        loading={ globalLoading }
      />
      <Snackbar />
    </div>
  )
}

export default Layout