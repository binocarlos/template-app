import React, { useCallback, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'

import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import Actions from 'store/utils/actions'
import Loading from 'components/system/Loading'

import UploadStatus from 'components/uploader/UploadStatus'
import HelperText from './HelperText'

import fileuploadActions from 'store/modules/fileupload'
import fileuploadSelectors from 'store/selectors/fileupload'

import icons from 'icons'

import {
  getUrl,
} from 'utils/storage'

const DeleteIcon = icons.delete
const UploadIcon = icons.upload

const useStyles = makeStyles(theme => createStyles({
  container: {
    marginTop: theme.spacing(1),
  },
  image: {
    maxWidth: '200px',
    border: '1px solid #000',
  },
  editIcon: {
    marginRight: theme.spacing(1),
  },
  buttonTitle: {
    display: 'inline-block',
    paddingRight: '10px',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
  },
  intro: {
    marginRight: theme.spacing(2),
  },
  imageContainer: {
    marginTop: theme.spacing(2),
  },
  filepath: {
    marginTop: theme.spacing(2),
  }
}))

const isImage = (data) => {
  if(data.type.indexOf('image') == 0) return true
  if(data.filename.match(/\.{jpg,png,jpeg,gif}$/i)) return true
  return false
}

const ImageField = ({
  field: {
    name,
    value,
  },
  form: {
    setFieldValue,
  },
  item,
}) => {
  const classes = useStyles()
  
  const uploadInProgress = useSelector(fileuploadSelectors.inProgress)
  const uploadStatus = useSelector(fileuploadSelectors.status)
  const uploadError = useSelector(fileuploadSelectors.errors.uploadFiles)

  const actions = Actions(useDispatch(), {
    onUploadFiles: fileuploadActions.uploadFiles,
    reset: fileuploadActions.reset,
  })

  const {
    getRootProps,
    getInputProps,
    inputRef,
  } = useDropzone({
    onDrop: async (files) => {
      const file = files[0]
      if(!file) return
      const result = await actions.onUploadFiles({
        files,
        path: item.path,
      })
      if(!result || !result[0]) return
      setFieldValue(name, result[0], file)
    },
    multiple: false,
  })

  const onOpenUploader = useCallback(() => {
    inputRef.current.click()
  }, [])

  const onResetValue = useCallback(() => {
    setFieldValue(name, null)
  }, [name])

  const buttons = useMemo(() => {
    return [
      {
        title: 'Upload',
        help: 'Upload an image from your computer',
        icon: UploadIcon,
        handler: onOpenUploader,
      },
      !item.noReset ? {
        title: 'Reset',
        help: 'Clear this image',
        icon: DeleteIcon,
        handler: onResetValue
      } : null
    ]
      .filter(item => item)
      .map((item, i) => {
        const Icon = item.icon
        return (
          <Tooltip title={ item.help } key={ i }>
            <Button
              variant="contained"
              size="small"
              onClick={ item.handler }
              className={ classes.button }
            >
              { item.title }&nbsp;&nbsp;&nbsp;<Icon size={ 16 } className={ classes.buttonIcon } />
            </Button>
          </Tooltip>
        )
      })
  }, [
    onResetValue,
  ])

  const helperText = item.helperText

  return uploadInProgress ? (
    <div className={ classes.container }>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {
            uploadInProgress ? (
              <UploadStatus
                inProgress={ uploadInProgress }
                error={ uploadError }
                status={ uploadStatus }
              />
            ) : (
              <Loading />
            )
          }
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={ classes.container }>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <div className={ classes.info }>
            <div className={ classes.intro }>
              <InputLabel 
                htmlFor={ name }>{ item.title || item.id }
              </InputLabel>
              {
                helperText ? (
                  <FormHelperText error={ false } id={ name + "-helperText" }>
                    { helperText }
                  </FormHelperText>
                ) : null
              }
            </div>
            { buttons }
          </div>
          {
            value && isImage(value) && (
              <div className={ classes.imageContainer }>
                <img className={ classes.image } src={ getUrl(value.filepath) } />
              </div>
            )
          }
          {
            value && (
              <div className={ classes.filepath }>
                <Typography variant="caption">
                  { value.filename }
                </Typography>
              </div>
            )
          }
        </Grid>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      </Grid>
      {
        uploadError && (
          <HelperText 
            helperText={ uploadError }
            error
            touched
          />
        )
      }
    </div>
  )
}

export default ImageField
