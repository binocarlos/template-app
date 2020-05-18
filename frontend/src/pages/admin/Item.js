import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Form from 'components/form/Form'

import itemActions from 'store/modules/item'
import itemSelectors from 'store/selectors/item'
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
  helperText: 'Enter the name of the booking item',
  validate: {
    type: 'string',
    methods: [
      ['required', 'The name is required'],
    ]
  }
}, {
  id: 'type',
  title: 'Type',
  helperText: 'Choose the type of the item',
  component: 'radio',
  row: true,
  options: [{
    title: 'Large',
    value: 'large',
  }, {
    title: 'Small',
    value: 'small',
  }],
}]

const HANDLERS = {}

const INITIAL_VALUES = {
  name: '',
  type: 'large',
}

const Item = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const loading = useSelector(itemSelectors.save.loading)
  const error = useSelector(itemSelectors.save.error)
  
  const { id } = useSelector(routerSelectors.params)
  const data = useSelector(itemSelectors.editItem)

  const onCancel = useCallback(() => {
    dispatch(routerActions.navigateTo('admin.items.list'))
  })

  const onSubmit = useCallback((payload) => {
    dispatch(itemActions.save(id, payload))
  }, [
    id,
  ])

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Item
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

export default Item