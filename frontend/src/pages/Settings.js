import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Form from 'components/form/Form'

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
}]

const HANDLERS = {}

const Settings = ({

}) => {
  const classes = useStyles()
  
  const loading = false
  const error = null

  const onSubmit = useCallback((payload) => {
    console.log('--------------------------------------------')
    console.log('--------------------------------------------')
    console.dir(payload)
  })

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
          initialValues={{
            color: {},
          }}
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