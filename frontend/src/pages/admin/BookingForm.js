import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Form from 'components/form/Form'

import bookingformActions from 'store/modules/bookingforms'
import bookingformSelectors from 'store/selectors/bookingforms'
import routerActions from 'store/modules/router'
import routerSelectors from 'store/selectors/router'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  actionButton: {
    marginLeft: theme.spacing(1),
  }
}))

const SCHEMA = [{
  id: 'name',
  title: 'Name',
  helperText: 'Enter the name of the booking form',
  validate: {
    type: 'string',
    methods: [
      ['required', 'The name is required'],
    ]
  }
}, {
  id: 'type',
  title: 'Type',
  helperText: 'Choose what type of booking this is',
  component: 'radio',
  row: true,
  options: [{
    title: 'Group Booking',
    value: 'group',
  }, {
    title: 'Ticket Booking',
    value: 'ticket',
  }],
}, {
  id: 'config',
  title: 'Config YAML',
  helperText: 'The config YAML for the booking form',
  rows: 10,
  component: 'textarea',
  validate: {
    type: 'string',
    methods: [
      ['required', 'The config is required'],
    ]
  }
}]

const HANDLERS = {}

const INITIAL_VALUES = {
  name: '',
  type: 'group',
  config: '',
}

const BookingForm = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const loading = useSelector(bookingformSelectors.save.loading)
  const error = useSelector(bookingformSelectors.save.error)
  
  const { id } = useSelector(routerSelectors.params)
  const data = useSelector(bookingformSelectors.editItem)

  const onCancel = useCallback(() => {
    dispatch(routerActions.navigateTo('admin.bookingforms.list'))
  })

  const onSubmit = useCallback((payload) => {
    dispatch(bookingformActions.save(id, payload))
  }, [
    id,
  ])

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Booking Form
        </Typography>
        <Form
          schema={ SCHEMA }
          handlers={ HANDLERS }
          error={ error }
          initialValues={ data || INITIAL_VALUES }
          onSubmit={ onSubmit }
        >
          {
            ({
              isValid,
              onSubmit,
            }) => {
              return (
                <div className={ classes.buttons }>
                  <Button
                    className={ classes.actionButton }
                    variant="contained"
                    onClick={ onCancel }
                  >
                    Cancel
                  </Button>
                  <Button
                    className={ classes.actionButton }
                    variant="contained"
                    color="primary"
                    onClick={ onSubmit }
                  >
                    Save
                  </Button>
                </div>
              )
            }
          }
        </Form>
      </Paper>
    </div>
  )
}

export default BookingForm