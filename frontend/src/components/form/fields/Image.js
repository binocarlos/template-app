import React, { useCallback, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'

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
  }
}))

const isImage = (url) => {
  if(url.match(/\.{jpg,png,jpeg,gif}$/i)) return true
  if(url.indexOf('unsplash.com') >= 0) return true
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
      console.log('--------------------------------------------')
      console.log('--------------------------------------------')
      console.dir(result)
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
        <Grid item xs={12} sm={2}>
          <InputLabel 
            htmlFor={ name }>{ item.title || item.id }</InputLabel>
          {
            helperText ? (
              <FormHelperText error={ false } id={ name + "-helperText" }>
                { helperText }
              </FormHelperText>
            ) : null
          }
        </Grid>
        {
          value && value.url && isImage(value.url) ? (
            <Grid item xs={12} sm={3}>
              <img className={ classes.image } src={ value.url } />
            </Grid>
          ) : ''
        }
        <Grid item xs={12} sm={7}>
          { buttons }
        </Grid>
        <Grid item xs={12}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>
        </Grid>
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
