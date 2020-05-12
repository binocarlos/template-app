import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'

import classNames from 'classnames'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'

import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'

import Actions from '../../utils/actions'
import snackbarActions from '../../store/modules/snackbar'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const SnackbarWrapper = ({

}) => {
  const classes = useStyles()
  const {
    open = false,
    text = '',
    type = 'default'
  } = useSelector(state => state.snackbar)
  const actions = Actions(useDispatch(), {
    onClose: snackbarActions.onClose,
  })

  const Icon = variantIcon[type]

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={ open }
        autoHideDuration={ 5000 }
        disableWindowBlurListener={ true }
        onClose={ actions.onClose }
      >
        <SnackbarContent
          className={ classNames(classes[type], classes.margin) }
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={ classes.message }>
              { 
                Icon && (
                  <Icon 
                    className={ classNames(classes.icon, classes.iconVariant) }
                  />
                )
              }
              { text }
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={ classes.close }
              onClick={ actions.onClose }
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  )
}

export default SnackbarWrapper