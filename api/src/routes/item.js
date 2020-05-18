const asyncHandler = require('express-async-handler')

const ItemRoutes = ({
  controllers,
}) => {

  const list = async (req, res) => {
    const result = await controllers.item.list({
      userid: req.user.id,
    })
    res.json(result)
  }

  const get = async (req, res) => {
    const result = await controllers.item.get({
      userid: req.user.id,
      id: req.params.id
    })
    res.json(result)
  }

  const create = async (req, res) => {
    const result = await controllers.item.create({
      userid: req.user.id,
      data: req.body,
    })
    res.json(result)
  }

  const update = async (req, res) => {
    const result = await controllers.item.update({
      userid: req.user.id,
      id: req.params.id,
      data: req.body,
    })
    res.json(result)
  }

  const del = async (req, res) => {
    const result = await controllers.item.delete({
      userid: req.user.id,
      id: req.params.id,
    })
    res.json(result)
  }

  return {
    list: asyncHandler(list),
    get: asyncHandler(get),
    create: asyncHandler(create),
    update: asyncHandler(update), 
    delete: asyncHandler(del), 
  }
}

module.exports = ItemRoutes