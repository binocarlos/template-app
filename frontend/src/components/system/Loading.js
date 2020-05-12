import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    maxWidth: '100%'
  },
  item: {
    textAlign: 'center',
    display: 'inline-block',
  },
}))

const Loading = ({
  color = 'primary',
  message = 'loading',
  children,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.item}>
          <CircularProgress 
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
          {
            children
          }
        </div>
        
      </div>
    </div>
  )
}

export default Loading