import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { Field } from 'formik'
import dotty from 'dotty'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import utils from './utils'

const useStyles = makeStyles(theme => ({
  errorContainer: {
    marginTop: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.main,
  },
  divider: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  fullHeight: {
    height: '100%',
  },
  mainError: {
    padding: theme.spacing(1),
  },
}))

const FormWrapperItem = ({
  item,
  values,
  errors,
  touched,
  onSetFieldValue,
  handlers,  
}) => {

  const fieldError = dotty.get(errors, item.id)
  const fieldTouched = dotty.get(touched, item.id)

  return (
    <Field
      name={ item.id }
      component={ utils.getComponent(item.component) }
      item={ item }
      values={ values }
      error={ fieldError }
      touched={ fieldTouched }
      onSetFieldValue={ onSetFieldValue }
      handlers={ handlers }
    />
  )
}

const FormWrapperRow = ({
  rowKey,
  row,
  values,
  errors,
  touched,
  onSetFieldValue,
  handlers,
}) => {
  const classes = useStyles()
  if(typeof(row) === 'string') {
    return (
      <Grid item xs={ 12 } key={ rowKey }>
        {
          row == '-' ? (
            <Divider className={ classes.divider } />
          ) : (
            <Typography
              variant='subtitle1'
              style={{
                fontWeight: 'bold',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              { row }
            </Typography>
          )
        }
        
      </Grid>
    )
  }
  else if (row.constructor === Array) {
    const colSize = Math.floor(12 / row.length)
    return row
      .filter(item => {
        if(!handlers.hidden) return true
        return handlers.hidden({
          name: item.id,
          values,
        }) ? false : true
      })
      .map((item, i) => (
        <Grid item xs={ 12 } sm={ colSize } key={ rowKey + '-' + i }>
          <FormWrapperItem
            item={ item }
            values={ values }
            errors={ errors }
            touched={ touched }
            onSetFieldValue={ onSetFieldValue }
            handlers={ handlers }
          />
        </Grid>
      ))
  }
  else {
    if(handlers.hidden && handlers.hidden({
      name: row.id,
      values,
    })) {
      return null
    }
    
    return (
      <Grid item xs={12} key={ rowKey }>
        <FormWrapperItem
          item={ row }
          values={ values }
          errors={ errors }
          touched={ touched }
          onSetFieldValue={ onSetFieldValue }
          handlers={ handlers }
        />
      </Grid>
    )
  }
}

const FormRender = ({
  schema,
  handlers,
  error,
  values,
  errors,
  touched,
  showErrors,
  fullHeight,
  onSetFieldValue,
}) => {

  const classes = useStyles()
 
  return (
    <React.Fragment>
      <Grid
        container
        spacing={ 2 }
        className={classnames({
          [classes.fullHeight]: fullHeight,
        })}
      >
        {
          schema.map((row, i) => {
            return (
              <FormWrapperRow
                key={ i }
                rowKey={ i }
                row={ row }
                values={ values }
                errors={ errors }
                touched={ touched }
                onSetFieldValue={ onSetFieldValue }
                handlers={ handlers }
              />
            )
          })
        }
        {
          error && (
            <div className={ classes.mainError }>
              <FormHelperText
                error={ true }
              >
                { error }
              </FormHelperText>
            </div>
          )
        }
      </Grid>
      {
        showErrors && Object.keys(errors).length > 0 && (
          <div className={ classes.errorContainer }>
            <Typography className={ classes.errorText }>
              There are errors in the form:
            </Typography>
            <ul className={ classes.errorText }>
              {
                Object.keys(errors).map((key, i) => (
                  <li key={ i }>
                    <Typography className={ classes.errorText }>
                      { key }: { errors[key] }
                    </Typography>
                  </li>
                ))
              }
            </ul>
          </div> 
        )
      }
    </React.Fragment>
  )
}

export default FormRender