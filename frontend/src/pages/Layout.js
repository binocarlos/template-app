import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import SideMenu from 'components/layout/SideMenu'
import AppBarMenu from 'components/layout/AppBarMenu'
import Snackbar from 'components/system/Snackbar'

import {
  MENU,
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
      <Snackbar />
    </div>
  )
}

export default Layout