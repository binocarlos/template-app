import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'

import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'

import icons from '../../icons'

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      height: '100%',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: theme.palette.background.paper,
      width: `240px`,
      minWidth: `240px`,
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }
})

const NavDrawer = ({
  Component,
  props,
  anchor,
  icon,
  theme = {},
}) => {

  const classes = useStyles()

  const [drawerOpen, setDrawerOpen] = useState(false)
  
  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  const navbarClassname = classnames(classes.drawer, theme.drawer)
  const iconClassname = classnames(classes.icon, theme.icon)

  const UseIcon = icon || icons.menu

  return (
    <React.Fragment>
      <IconButton 
        onClick={ openDrawer }
      >
        <UseIcon
          className={ iconClassname }
          color="inherit" 
        />
      </IconButton>
      <Drawer 
        open={ drawerOpen }
        anchor={ anchor }
        onClose={ closeDrawer }
      >
        <div className={ navbarClassname }>
          <Component
            onClick={ closeDrawer }
            {...props}
          />
        </div>
      </Drawer>
    </React.Fragment> 
  )
}

export default NavDrawer
