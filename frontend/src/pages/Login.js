import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

const Login = ({

}) => {
  const classes = useStyles()

  return (
    <div className={ classes.root }>
      Login
    </div>
  )
}

export default Login