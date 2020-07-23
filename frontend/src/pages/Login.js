import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Link from 'components/widgets/Link'
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
  id: 'email',
  title: 'Email',
  helperText: 'Enter your email address',
  validate: {
    type: 'string',
    methods: [
      ['required', 'The email is required'],
      ['email', 'Must be a valid email address'],
    ]
  }
}, {
  id: 'password',
  title: 'Password',
  helperText: 'Enter your password',
  inputProps: {
    type: 'password',
  },
  validate: {
    type: 'string',
    methods: [
      ['required', 'The password is required'],
    ]
  }
}]

const HANDLERS = {
  // validate: (values) => {
  //   const errors = {}
  //   if(values.email == 'a') errors.password = 'APPLES'
  //   return errors
  // },
  // value: ({
  //   name,
  //   values,
  //   value,
  // }) => {
  //   if(name == 'password' && values.email == 'a') return 'HELLO'
  //   return value
  // },
  // disabled: ({
  //   name,
  //   values,
  //   value,
  // }) => {
  //   return name == 'password' && values.email == 'b'
  // },
  // hidden: ({
  //   name,
  //   values,
  //   value,
  // }) => {
  //   return name == 'password' && values.email == 'a'
  // },
}

const Login = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loading = useSelector(authSelectors.login.loading)
  const error = useSelector(authSelectors.login.error)

  const onLogin = useCallback((payload) => {
    dispatch(authActions.login(payload))
  })

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Login
        </Typography>
        <Form
          schema={ SCHEMA }
          handlers={ HANDLERS }
          error={ error }
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={ onLogin }
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
                    Login
                  </Button>
                </div>
              )
            }
          }
        </Form>
        <div className={ classes.footer }>
          <Typography variant="body1">
            <Link name="register">Click here</Link> to register an account...
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default Login