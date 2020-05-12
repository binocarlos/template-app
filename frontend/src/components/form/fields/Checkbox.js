import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import HelperText from './HelperText'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
}))

const CheckboxField = ({
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
      <FormLabel component="legend">{ title }</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name={ name }
              checked={ value ? true : false }
              onChange={ onChange }
              value={ name }
            />
          }
          label={ title }
        />
      </FormGroup>
      <HelperText
        helperText={ item.helperText }
        error={ error }
        touched={ touched }
      />
    </FormControl>
  )

}

export default CheckboxField