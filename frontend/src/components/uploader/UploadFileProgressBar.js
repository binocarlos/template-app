import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import prettyBytes from 'pretty-bytes'

const useStyles = makeStyles(theme => createStyles({
  root: {
    marginTop: theme.spacing(1),
  },
  rightAlign: {
    textAlign: 'right',
  },
}))


const UploadFileProgressBar = ({
  color,
  filename,
  size,
  uploadedBytes,
  percentDone,
  remainingTime,
}) => {
  const classes = useStyles()

  const timeLeftSeconds = Math.round(remainingTime / 1000) + 1
  const timeLeftMinutes = Math.floor(timeLeftSeconds / 60)
  const timeLeftMinutesSeconds = timeLeftSeconds % 60

  const timeLeft = timeLeftSeconds < 60 ?
    `${timeLeftSeconds} secs` :
    `${timeLeftMinutes} mins ${timeLeftMinutesSeconds} secs`

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        <Typography variant="body2">
          { filename } - { prettyBytes(size) }
        </Typography>
      </Grid>
      <Grid item xs={ 12 }>
        <LinearProgress 
          variant="determinate"
          value={ percentDone }
          color={ color }
        />
      </Grid>
      <Grid item xs={ 6 }>
        <Typography variant="caption">
          { `${ prettyBytes(uploadedBytes) } - ${ percentDone }%` }
        </Typography>
      </Grid>
      {
        remainingTime > 0 && (
          <Grid item xs={ 6 } className={ classes.rightAlign }>
            <Typography variant="caption">
              { timeLeft } remaining
            </Typography>
          </Grid>
        )
      }
    </Grid>
  )
}


export default UploadFileProgressBar