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

const Login = ({

}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
 
  return (
    <div className={ classes.root }>
      <Paper className={ classes.paper }>
        <Button
          variant="contained"
          color="primary"
          onClick={ () => document.location = '/api/v1/auth/google' }
        >
          Login with Google
        </Button>
      </Paper>
    </div>
  )
}

export default Login