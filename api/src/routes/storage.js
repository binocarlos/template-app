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

  const download = (req, res) => {
    res.json({ok:true})
  }

  return {
    upload: asyncHandler(upload),
    download: asyncHandler(download),
  }
}

module.exports = StorageRoutes