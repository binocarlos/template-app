import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'

const HelperText = ({
  helperText,
  error,
  touched,
}) => {
  if(!error && !helperText) return null

  const hasError = touched && error

  return (  
    <FormHelperText
      error={ hasError }
    >
      { helperText }
    </FormHelperText>
  )
}

export default HelperText