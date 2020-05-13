import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router5'

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
}, {
  id: 'confirm_password',
  title: 'ConfirmPassword',
  helperText: 'Confirm your password',
  inputProps: {
    type: 'password',
  },
  validate: {
    type: 'string',
    methods: [
      ['required', 'The confirm password is required'],
    ]
  }
}]

const HANDLERS = {
  validate: (values) => {
    const errors = {}
    if(values.password && values.confirm_password && values.password != values.confirm_password) {
      errors.password = errors.confirm_password = 'The passwords must match'
    }
    return errors
  },
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

const Register = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const loading = useSelector(authSelectors.register.loading)
  const error = useSelector(authSelectors.register.error)

  const onRegister = useCallback((payload) => {
    dispatch(authActions.register(payload))
  })

  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Typography gutterBottom variant="h6">
          Register
        </Typography>
        <Form
          schema={ SCHEMA }
          handlers={ HANDLERS }
          error={ error }
          initialValues={{
            email: '',
            password: '',
            confirm_password: '',
          }}
          onSubmit={ onRegister }
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
                    Register
                  </Button>
                </div>
              )
            }
          }
        </Form>
        <div className={ classes.footer }>
          <Typography variant="body1">
            <Link routeName="login">Click here</Link> to login...
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default Register