import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
import Error from './Error'

const useStyles = makeStyles(theme => createStyles({
  container: ({transparent}) => ({
    position: 'absolute',
    left: '0px',
    top: '0px',
    zIndex: 10000,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: transparent ?
      'rgba(255, 255, 255, 0.7)' :
      'rgba(255, 255, 255, 1)'
  }),
  loadingContainer: {
    width: '600px',
    height: '300px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    boxShadow: 'none',
    borderRadius: 20,
  },
  logs: {
    color: '#999'
  }
}))

const GlobalLoading = ({
  loading = {},
}) => {
  const loadingValues = typeof(loading) === 'object' ?
    loading :
    {}
  const {
    transparent = true,
    message = 'loading...',
    error,
    logs = [],
  } = (loadingValues || {})
  const classes = useStyles({transparent})
  if(!loading) return null
  return (
    <div className={ classes.container }>
      <div className={ classes.loadingContainer }>
        {
          error ? (
            <Error
              message={ error }
            />
          ) : (
            <Loading
              message={ message }
            >
              {
                logs.map((log, i) => {
                  return (
                    <Typography
                      variant="body2"
                      key={ i }
                      className={ classes.logs }
                    >
                      { log }
                    </Typography>
                  )
                })
              }
            </Loading>
          )
        }
      </div>
    </div>
  )
}

export default GlobalLoading