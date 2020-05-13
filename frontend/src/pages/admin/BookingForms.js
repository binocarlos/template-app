import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Table from 'components/table/SimpleTable'
import Window from 'components/dialog/Window'

import routerActions from 'store/modules/router'
import bookingformActions from 'store/modules/bookingforms'
import bookingformSelectors from 'store/selectors/bookingforms'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flexGrow: 1,
  },
  addButton: {
    flexGrow: 0,
  },
  actionButton: {
    margin: theme.spacing(1),
  }
}))

const FIELDS = [{
  title: 'name',
  name: 'name',
},{
  title: 'type',
  name: 'type',
}]

const BookingForms = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [ deletingItem, setDeletingItem ] = useState(null)
  const data = useSelector(bookingformSelectors.data)

  const onAdd = useCallback(() => {
    dispatch(routerActions.navigateTo('admin.bookingforms.edit', {id: 'new'}))
  })

  const onEdit = useCallback((item) => {
    dispatch(routerActions.navigateTo('admin.bookingforms.edit', {id: item.id}))
  })

  const onCancelDelete = useCallback(() => {
    setDeletingItem(null)
  })

  const onConfirmDelete = useCallback(async () => {
    const result = await dispatch(bookingformActions.delete(deletingItem.id))
    if(result) {
      setDeletingItem(null)
    }
  }, [
    deletingItem,
  ])

  const tableData = useMemo(() => {
    return data.map(bookingform => {
      return {
        id: bookingform.id,
        name: bookingform.name,
        type: bookingform.type,
      }
    })
  }, [
    data,
  ])

  const getActions = useCallback((item) => {
    return (
      <>
        <Button
          className={ classes.actionButton }
          size="small"
          variant="outlined"
          onClick={ () => setDeletingItem(item) }
        >
          Delete
        </Button>
        <Button
          className={ classes.actionButton }
          size="small"
          variant="outlined"
          onClick={ (e) => {
            onEdit(item)
            return false
          }}
        >
          Edit
        </Button>
      </>
    )
  })

  return (
    <div className={ classes.root }>
      <div className={ classes.toolbar }>
        <div className={ classes.title }>
          <Typography gutterBottom variant="h6">
            Booking Forms
          </Typography>
        </div>
        <div className={ classes.addButton }>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={ onAdd }
          >
            Add Booking Form
          </Button>
        </div>
      </div>
      <div className={ classes.content }>
        <Table
          data={ tableData }
          fields={ FIELDS }
          getActions={ getActions }
        />
      </div>
      {
        deletingItem && (
          <Window
            open
            withCancel
            title="Confirm delete"
            submitTitle="Delete"
            onCancel={ onCancelDelete }
            onSubmit={ onConfirmDelete }
          >
            <Typography>
              Are you absolutely sure you want to delete the { deletingItem.name } booking form?
            </Typography>
          </Window>
        )
      }
    </div>
  )
}

export default BookingForms