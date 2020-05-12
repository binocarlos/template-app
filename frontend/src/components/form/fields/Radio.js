import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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

const RadioField = ({
  field: {
    name,
    value,
    onChange,
  },
  error,
  touched,
  item,
  values,
  handlers,
  handlerContext,
}) => {
  const classes = useStyles()
  const title = item.title || name

  const disabled = handlers && handlers.isDisabled ?
    handlers.isDisabled({
      name,
      value,
      values,
      context: handlerContext,
    }) : false

  const useValue = handlers && handlers.getValue ?
    handlers.getValue({
      name,
      value,
      values,
      context: handlerContext,
    }) : value

  return (
    <FormControl component="fieldset" className={ classes.root }>
      <FormLabel component="legend">{ title }</FormLabel>
      <RadioGroup
        aria-label={ title }
        name={ name }
        value={ useValue }
        onChange={ onChange }
        row={ item.row ? true : false }
      >
        {
          (item.options || []).map((option, i) => {
            option = typeof(option) === 'string' ? {
              title: option,
              value: option,
            } : option

            return (
              <FormControlLabel
                key={ i }
                value={ option.value }
                label={ option.title }
                disabled={ disabled }
                control={<Radio />}
              />
            )
          })
        }
      </RadioGroup>
      <HelperText
        helperText={ item.helperText }
        error={ error }
        touched={ touched }
      />
    </FormControl>
  )
}

export default RadioField