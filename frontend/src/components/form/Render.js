import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { Field } from 'formik'
import dotty from 'dotty'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import utils from './utils'

const useStyles = makeStyles(theme => createStyles({
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
  }
}))

const FormWrapperItem = ({
  item,
  values,
  errors,
  touched,
  onSetFieldValue,
  handlers,
  handlerContext,
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
      handlerContext={ handlerContext }
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
  handlerContext,
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
    return row.map((item, i) => (
      <Grid item xs={ 12 } sm={ colSize } key={ rowKey + '-' + i }>
        <FormWrapperItem
          item={ item }
          values={ values }
          errors={ errors }
          touched={ touched }
          onSetFieldValue={ onSetFieldValue }
          handlers={ handlers }
          handlerContext={ handlerContext }
        />
      </Grid>
    ))
  }
  else {
    return (
      <Grid item xs={12} key={ rowKey }>
        <FormWrapperItem
          item={ row }
          values={ values }
          errors={ errors }
          touched={ touched }
          onSetFieldValue={ onSetFieldValue }
          handlers={ handlers }
          handlerContext={ handlerContext }
        />
      </Grid>
    )
  }
}

const FormRender = ({
  schema,
  spacing = 2,
  error,
  values,
  errors,
  touched,
  showErrors,
  fullHeight,
  onSetFieldValue,
  handlers,
  handlerContext,
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
                handlerContext={ handlerContext }
              />
            )
          })
        }
        {
          error && (
            <FormHelperText
              error={ true }
            >
              { error }
            </FormHelperText>
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