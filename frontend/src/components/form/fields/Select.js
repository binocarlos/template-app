import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import HelperText from './HelperText'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    //marginTop: theme.spacing(2),
  },
}))

const SelectField = ({
  field: {
    name,
    value,
    onChange,
  },
  error,
  touched,
  item,
}) => {
  const classes = useStyles()
  const title = item.title || name

  return (
    <FormControl component="fieldset" className={ classes.root }>
      <InputLabel htmlFor={ name }>{ title }</InputLabel>
      <Select
        value={ value || '' }
        onChange={ onChange }
        inputProps={{
          name,
          id: name,
        }}
      >
        {
          (item.options || []).map((option, i) => {
            option = typeof(option) === 'string' ? {
              title: option,
              value: option,
            } : option

            return (
              <MenuItem
                key={ i }
                value={ option.value }
              >
                { option.title }
              </MenuItem>
            )
          })
        }
      </Select>
      <HelperText
        helperText={ item.helperText }
        error={ error }
        touched={ touched }
      />
    </FormControl>
  )
}

export default SelectField