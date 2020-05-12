import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import icons from '../../icons'

const ErrorIcon = icons.error

const useStyles = makeStyles(theme => createStyles({
  root: {
    textAlign: 'center',
  },
}))

const Error = ({
  color = 'error',
  message = 'error',
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ErrorIcon 
        color={ color }
      />
      { 
        message && (
          <Typography
            variant='subtitle1'
            color={ color }
          >
            { message }
          </Typography>
        )
      }
    </div>
  )
}

export default Error