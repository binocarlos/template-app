import React, { useCallback } from 'react'
import { useDispatch, useStore } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import routerActions from '../../store/modules/router'

const MenuList = ({
  items,
  onClick,
}) => {
  const dispatch = useDispatch()
  const store = useStore()
  const clickItem = useCallback((item) => {
    if(item.link) {
      dispatch(routerActions.navigateTo(item.link, item.params || {}))
    }
    else if(item.handler) {
      item.handler(dispatch, store.getState)
    }
    if(onClick) onClick(item)
  }, [])

  return (
    <List component="nav">
      {
        items.map((item, i) => {
          if(item === '-') {
            return (
              <Divider key={ i } />
            )
          }
    
          return (
            <ListItem 
              button 
              key={ i }
              onClick={ () => clickItem(item) }
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
              />
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default MenuList