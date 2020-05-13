const asyncHandler = require('express-async-handler')

const StorageRoutes = ({
  controllers,
}) => {

  const upload = async (req, res) => {
    const {
      path,
      filename,
      type,
      size,
    } = req.query
    const result = await controllers.storage.upload({
      userid: req.user.id,
      path,
      filename,
      size,
      type,
      contentStream: req,
    })
    res.json(result)
  }

  const download = async (req, res) => {
    const {
      filepath,
    } = req.query

    const downloadStream = await controllers.storage.download({
      filepath,
    })

    downloadStream
      .on('error', (err) => {
        res.status(500)
        res.end(err.toString())
      })
      .on('response', (remoteResponse) => {
        res.set({
          'content-type': remoteResponse.headers['content-type'],
          'content-length': remoteResponse.headers['content-type'],
          'etag': remoteResponse.headers['etag'],
        })
      })
      .pipe(res)
  }

  return {
    upload: asyncHandler(upload),
    download: asyncHandler(download),
  }
}

module.exports = StorageRoutes