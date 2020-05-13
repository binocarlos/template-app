import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

const Dashboard = ({

}) => {
  const classes = useStyles()
  return (
    <div className={ classes.root }>
      Dashboard
    </div>
  )
}

export default Dashboard