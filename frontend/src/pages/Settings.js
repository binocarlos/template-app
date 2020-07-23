import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Form from 'components/form/Form'

import authActions from 'store/modules/auth'
import authSelectors from 'store/selectors/auth'

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
  footer: {
    marginTop: theme.spacing(4),
  },
}))

const SCHEMA = [{
  id: 'color',
  title: 'Colour',
  helperText: 'Choose the main Colour',
  component: 'color',
}, {
  id: 'logo',
  title: 'Logo',
  helperText: 'Upload a logo',
  component: 'image',
  path: 'settings',
}]

const HANDLERS = {}

const Settings = ({

}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  
  const loading = false
  const error = null

  const onSubmit = useCallback((payload) => {
    dispatch(authActions.updateSettings({payload}))
  })

  const userData = useSelector(authSelectors.data)

  const initialValues = Object.assign({}, {
    color: {},
    logo: null,
  }, userData.meta)

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Settings
        </Typography>
        <Form
          schema={ SCHEMA }
          handlers={ HANDLERS }
          error={ error }
          initialValues={initialValues }
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
                    variant="contained"
                    color="primary"
                    disabled={ loading || !isValid }
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

export default Settings