import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from '@material-ui/core/Divider'

import UploadFileProgressBar from './UploadFileProgressBar'

const useStyles = makeStyles(theme => createStyles({
  errorText: {
    color: theme.palette.error.main,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const UploadStatus = ({
  error,
  status,
}) => {
  const classes = useStyles()
  const fileCount = Object.keys(status).length

  const totals = Object.keys(status).reduce((all, key) => {
    all.size += status[key].size
    all.uploadedBytes += status[key].uploadedBytes
    return all
  }, {
    size: 0,
    uploadedBytes: 0,
  })

  totals.percent = Math.floor((totals.uploadedBytes / totals.size) * 100)

  return (
    <div>

      {
        fileCount > 1 && (
          <React.Fragment>
            <UploadFileProgressBar
              filename={ `${ fileCount } file${ fileCount == 1 ? '' : 's'}` }
              size={ totals.size }
              percentDone={ totals.percent }
              uploadedBytes={ totals.uploadedBytes }
              color="secondary"
            />
            <Divider className={ classes.divider } />
          </React.Fragment>
        )
      }
      
      {
        error ? (
          <DialogContentText className={ classes.errorText }>{ error }</DialogContentText>
        ) : Object.keys(status).map((filename, i) => {
          const uploadInfo = status[filename]
          return (
            <UploadFileProgressBar
              key={ i }
              filename={ filename }
              size={ uploadInfo.size }
              percentDone={ uploadInfo.percentDone }
              remainingTime={ uploadInfo.remainingTime }
              uploadedBytes={ uploadInfo.uploadedBytes }
              color="primary"
            />
          )
        })
      }
    </div>
  )
}

export default UploadStatus