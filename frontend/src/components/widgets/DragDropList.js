import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const useStyles = makeStyles(theme => ({
  menuItem: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
  },
  menuIcon: {
    marginRight: '0px',
  },
  normalListItem: {
    color: theme.palette.grey[600],
  },
}))

const DragDropList = ({
  items,
  theme = {},
  getTitle = (item, i) => item.name,
  IconClass,
  onChange,
}) => {
  const classes = useStyles()
  const onDragEnd = useCallback(result => {
    if (!result.destination) return
    const startIndex = result.source.index
    const endIndex = result.destination.index
    const newIds = items.map(item => item.id)
    const [removed] = newIds.splice(startIndex, 1)
    newIds.splice(endIndex, 0, removed)
    onChange(newIds)
  }, [items, onChange])

  return (
    <DragDropContext onDragEnd={ onDragEnd }>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            className={ theme.root }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <List>
              {
                items.map((item, index) => {
                  return (
                    <Draggable key={ item.id } draggableId={ item.id } index={ index }>
                      {(provided, snapshot) => (
                        <div
                          ref={ provided.innerRef }
                          { ...provided.draggableProps }
                          { ...provided.dragHandleProps }
                          style={ provided.draggableProps.style }
                        >
                          <ListItem
                            dense
                            className={ classes.menuItem }
                          >
                            {
                              IconClass && (
                                <ListItemIcon>
                                  <IconClass />
                                </ListItemIcon>
                              )
                            }
                            <ListItemText
                              classes={{
                                primary: classes.normalListItem
                              }}
                              primary={ getTitle(item, index) }
                            />
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  )
                })
              }
              { provided.placeholder }
            </List>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragDropList
