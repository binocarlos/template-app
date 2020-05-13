const Storage = require('../utils/storage')

const StorageController = ({
  store,
}) => {

  const upload = async ({
    userid,
    path = '',
    size,
    type,
    filename,
    contentStream,
  }) => {
    const storage = Storage()

    const filepath = ['account', userid, path, `${new Date().getTime()}-${filename}`].filter(p => p).join('/')
    const uploadStream = storage.streamUpload({
      filepath,
      contentType: type,
    })

    await new Promise((resolve, reject) => {
      uploadStream.on('finish', async () => {
        resolve()
      })
      uploadStream.on('error', reject)
      contentStream.pipe(uploadStream)   
    })

    return {
      filename,
      filepath,
      type,
      size,
    }
  }

  const download = async ({
    filepath,
  }) => {
    const storage = Storage()
    return storage.streamDownload({
      filepath,
    })
  }

  return {
    upload,
    download,
  }
}

module.exports = StorageController