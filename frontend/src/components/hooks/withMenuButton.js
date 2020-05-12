import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'

import routerActions from '../../store/modules/router'

const useStyles = makeStyles(theme => ({
  list: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  menuItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  menuText: {
    paddingRight: '50px',
  },
  headerText: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  menuLink: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
  },
  smallIcon: {
    transform: 'scale(0.7)',
  },
}))

const ItemMenu = ({
  anchorEl,
  menuItems,
  open,
  onClose,
  onItemClick,
}) => {
  const classes = useStyles()

  return (
    <Menu
      classes={{
        list: classes.list,
      }}
      anchorEl={ anchorEl }
      open={ open }
      onClose={ onClose }
    >
      <MenuItem key="placeholder" style={{display: "none"}} />
      {
        menuItems.map((item, i) => {
          if(item === '-') {
            return (
              <Divider key={ i } />
            )
          }

          return (
            <MenuItem
              key={ i }
              className={ classes.menuItem }
              onClick={ (e) => {
                onItemClick(item)
              }}
            >
              {
                item.icon && (
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                )
              }
              <ListItemText 
                primary={ item.title }
                secondary={ item.help }
                classes={{
                  primary: classes.menuText,
                }}
              />
              {
                item.secondaryIcon && (
                  <ListItemSecondaryAction>
                    <div className={ classes.smallIcon }>
                      <item.secondaryIcon />
                    </div>
                  </ListItemSecondaryAction>
                )
              }
            </MenuItem>
            
          )
        })
      }
    </Menu>
  )
}

const withMenuButton = ({
  // anchor the menu to the given element
  parentAnchorEl,

  // a function that when called with return
  // an array of items to render
  // each item is an object with
  //
  //  * title
  //  * help
  //  * icon
  //  * secondaryIcon
  //  * items - a sub array of items i.e. sub-menu
  //  * handler - a function to run if clicked
  //  * url - if given the item will open the url in a new window
  //
  // if the item is a '-' string - a divider will be rendered
  getItems,

  // params to pass to the getItems function
  getItemsParams,

  // callback for when the menu is opened
  onOpen,

  // callback for when an item is clicked
  onClick,

  // callback when the menu is closed
  onClose,
}) => {
  const dispatch = useDispatch()
  const store = useStore()

  const [subAnchorEl, setSubAnchorEl] = useState(null)
  const [subItems, setSubItems] = useState(null)

  const handleMenu = useCallback(
    e => {
      if(onOpen) onOpen(e)
      setSubAnchorEl(e.currentTarget)
    },
    [
      onOpen,
    ]
  )

  const handleClose = useCallback(
    (e) => {
      if(onClose) onClose()
      setSubAnchorEl(null)
      setSubItems(null)
    },
    [
      onClose,
    ]
  )

  const handleItemClick = useCallback((item) => {
    if(item.items) {
      setSubItems(item.items)
    }
    else if(item.link) {
      dispatch(routerActions.navigateTo(item.link, item.params || {}))
    }
    else if(item.handler) {
      item.handler(dispatch, store.getState)
    }
    if(onClick) {
      onClick(item)
    }
    if(!item.items) handleClose()
  }, [
    getItems,
    onClick,
  ])

  const useParentEl = subAnchorEl || parentAnchorEl
  const mainMenuOpen = useParentEl && !subItems ? true : false
  const subMenuOpen = useParentEl && subItems ? true : false

  const mainMenu = useMemo(
    () => {
      if(!mainMenuOpen) return null
      return (
        <ItemMenu
          anchorEl={ useParentEl }
          menuItems={ getItems(getItemsParams, handleClose) }
          open={ mainMenuOpen }
          onClose={ handleClose }
          onItemClick={ handleItemClick }
        />
      )
    },
    [
      useParentEl,
      mainMenuOpen,
      getItems,
      getItemsParams,
      handleClose,
      handleItemClick,
    ]
  )

  const subMenu = useMemo(
    () => {
      if(!subItems) return null
      return (
        <ItemMenu
          anchorEl={ useParentEl }
          menuItems={ subItems }
          open={ subMenuOpen }
          onClose={ handleClose }
          onItemClick={ handleItemClick }
        />
      )
    },
    [
      useParentEl,
      subItems,
      subMenuOpen,
      handleClose,
      handleItemClick,
    ]
  )

  const menus = (
    <React.Fragment>
      { mainMenu }
      { subMenu }
    </React.Fragment>
  )

  return {
    menus,
    onClick: handleMenu,
  }
}

export default withMenuButton