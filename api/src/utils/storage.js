const { Storage } = require('@google-cloud/storage')

const settings = require('../settings')

const StorageClient = ({
  credentials_file = settings.google_storage_credentials_file,
  bucketName =  settings.google_storage_bucket_name,
  prefix = settings.google_storage_bucket_prefix,
} = {}) => {

  const storage = new Storage({
		keyFilename: credentials_file,
  })

  const bucket = storage.bucket(bucketName)

  const getPath = (filepath) => [prefix, filepath].filter(p => p).join('/')
  const getFile = (filepath) => bucket.file(getPath(filepath))

  const streamUpload = ({
    filepath,
    contentType,
  }) => {
    const blob = getFile(filepath)
    const stream = blob.createWriteStream({
		  contentType,
    })
    return stream
  }

  const streamDownload = ({
    filepath,
  }) => {
    const blob = getFile(filepath)
    const stream = blob.createReadStream({})
    return stream
  }

  const uploadFile = ({
    localFile,
    remoteFile,
  }) => bucket.upload(getPath(localFile), {
    gzip: true,
    destination: remoteFile,
    resumable: false,
  })

  const downloadFile = ({
    localFile,
    remoteFile,
  }) => getFile(remoteFile)
    .download({
      destination: localFile,
    })

  const listFiles = async ({
    prefix,
  } = {}) => {
    const [files] = await bucket.getFiles({
      prefix: getPath(prefix)
    })
    return files
  }

  const meta = async ({
    filepath,
  }) => {
    const metaData = await getFile(filepath).getMetadata()
    return metaData
  }

  return {
    streamUpload,
    streamDownload,
    uploadFile,
    downloadFile,
    listFiles,
    meta,
  }
}

module.exports = StorageClient