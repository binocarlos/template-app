import React, { useCallback, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'

import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import Actions from '../../../utils/actions'
import Loading from '../../system/Loading'

import UploadStatus from '../../uploader/UploadStatus'

import driveActions from '../../../store/modules/drive'
import unsplashActions from '../../../store/modules/unsplash'
import fileuploadActions from '../../../store/modules/fileupload'
import fileuploadSelectors from '../../../store/selectors/fileupload'

import icons from '../../../icons'

const UploadIcon = icons.upload
const DeleteIcon = icons.delete

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
  const syncLoading = useSelector(fileuploadSelectors.loading.syncFiles)
  const uploadError = useSelector(fileuploadSelectors.errors.uploadFiles)

  const actions = Actions(useDispatch(), {
    onSyncFiles: fileuploadActions.syncFiles,
    onUploadFiles: fileuploadActions.uploadFiles,
    reset: fileuploadActions.reset,
    getDriveItem: driveActions.getDriveItem,
    getUnsplashItem: unsplashActions.getUnsplashItem,
  })

  // const onAddFinderContent = useCallback(({id, data}) => {
  //   onCloseFinder()
  //   actions.onSyncFiles({
  //     driver: finderDriver,
  //     fileid: id,
  //     onComplete: (file) => {
  //       const finalData = Object.assign({}, data, file, {
  //         driver: finderDriver,
  //       })
  //       setFieldValue(name, finalData)
  //     }
  //   })
  //   // }
  // }, [setFieldValue, finderDriver, name])

  // const onAddUploaderContent = useCallback((files) => {
  //   setFieldValue(name, files[0])
  // }, [setFieldValue, name])

  const {
    getRootProps,
    getInputProps,
    inputRef,
  } = useDropzone({
    onDrop: async (files) => {
      const result = await actions.onUploadFiles({
        files,
      })
      setFieldValue(name, result[0])
    },
    multiple: false,
  })

  // const onOpenFinder = useCallback((driver) => setFinderDriver(driver))
  // const onCloseFinder = useCallback(() => setFinderDriver(null))
  const onOpenUploader = useCallback(() => {
    inputRef.current.click()
  }, [])

  const onResetValue = useCallback(() => {
    setFieldValue(name, null)
  }, [name])

  const onChooseDriveImage = useCallback(async () => {
    const image = await actions.getDriveItem({
      listFilter: 'folder,image',
      addFilter: 'image',
    })
    if(!image) return
    const result = await actions.onSyncFiles({
      driver: 'drive',
      id: image.id,
    })
    setFieldValue(name, result)
  }, [])

  const onChooseUnsplashImage = useCallback(async () => {
    const image = await actions.getUnsplashItem({
      
    })
    setFieldValue(name, image)
  }, [])

  const buttons = useMemo(() => {

    const local = {
      title: 'Upload',
      help: 'Upload an image from your computer',
      icon: icons.upload,
      handler: onOpenUploader,
    }

    const google = {
      title: 'Google Drive',
      help: 'Choose an image on your google drive',
      icon: icons.drive,
      handler: onChooseDriveImage,
    }

    const unsplash = {
      title: 'Unsplash',
      help: 'Choose an image from Unsplash',
      icon: icons.unsplash,
      handler: onChooseUnsplashImage,
    }

    return [
      !item.providers || item.providers.indexOf('local') >= 0 ?
        local :
        null,
      !item.providers || item.providers.indexOf('google') >= 0 ?
        google :
        null,
      !item.providers || item.providers.indexOf('unsplash') >= 0 ?
        unsplash :
        null,
      {
        title: 'Reset',
        help: 'Clear this image',
        icon: DeleteIcon,
        handler: onResetValue
      }
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

  return uploadInProgress || syncLoading ? (
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
          value && value.url ? (
            <Grid item xs={12} sm={3}>
              <img className={ classes.image } src={ value.url } />
              </Grid>
          ) : null
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
    </div>
  )
}

export default ImageField
