import React from 'react'
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
  }
}))

const SCHEMA = [{
  id: 'email',
  title: 'Email',
  helperText: 'Enter your email address',
}, {
  id: 'password',
  title: 'Password',
  helperText: 'Enter your password',
}]

const Login = ({

}) => {
  const classes = useStyles()

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Login
        </Typography>
        <Form
          schema={ SCHEMA }
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={ (values) => console.log(values) }
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
                    disabled={ isValid ? false : true }
                    onClick={ onSubmit }
                  >
                    Login
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

export default Login