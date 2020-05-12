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

const MultipleCheckboxField = ({
  field: {
    name,
    value,
  },
  form: {
    setFieldValue,
  },
  error,
  touched,
  item,
}) => {
  const classes = useStyles()

  const title = item.title || name
  const useValue = value || {}

  return (
    <FormControl component="fieldset" className={ classes.root }>
      <FormLabel component="legend">{ title }</FormLabel>
      <FormGroup
        row={ item.row ? true : false }
      >
        {
          (item.options || []).map((option, i) => {
            option = typeof(option) === 'string' ? {
              title: option,
              value: option,
            } : option

            const checked = useValue[option.value] ? true : false

            return (
              <FormControlLabel
                key={ i }
                control={
                  <Checkbox
                    name={ `${name}-${i}` }
                    checked={ checked }
                    onChange={ () => {
                      const newValue = Object.assign({}, useValue)
                      if(!checked) {
                        newValue[option.value] = true
                      }
                      else {
                        delete(newValue[option.value])
                      }
                      setFieldValue(name, newValue)
                    }}
                    value={ `${name}-${i}` }
                  />
                }
                label={ option.title }
              />
            )
          })
        }
      </FormGroup>
      <HelperText
        helperText={ item.helperText }
        error={ error }
        touched={ touched }
      />
    </FormControl>
  )
}

export default MultipleCheckboxField