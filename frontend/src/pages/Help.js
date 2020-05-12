import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

const Help = ({

}) => {
  const classes = useStyles()

  return (
    <div className={ classes.root }>
      Help
    </div>
  )
}

export default Help