import React from 'react'
import TextField from '@material-ui/core/TextField'

const Text = ({
  field: {
    name,
    value,
    onChange,
    onBlur
  },
  error,
  touched,
  item,
}) => {
  const inputProps = item.inputProps || {}
  return (
    <TextField
      fullWidth
      id={ name }
      name={ name }
      label={ item.title || item.id }
      helperText={ touched && error ? error : item.helperText }
      error={ touched && Boolean(error) }
      value={ value || '' }
      onChange={ onChange }
      onBlur={ onBlur }
      { ...inputProps }
    />
  )
}

export default Text