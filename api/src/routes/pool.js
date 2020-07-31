const asyncHandler = require('express-async-handler')

const PoolRoutes = ({
  controllers,
}) => {

  const list = async (req, res) => {
    const result = await controllers.pool.list()
    res.json(result)
  }

  const get = async (req, res) => {
    const result = await controllers.pool.get({
      id: req.params.id
    })
    res.json(result)
  }

  const create = async (req, res) => {
    const result = await controllers.pool.create({
      data: req.body,
    })
    res.status(201)
    res.json(result)
  }

  const update = async (req, res) => {
    const result = await controllers.pool.update({
      id: req.params.id,
      data: req.body,
    })
    res.json(result)
  }

  const del = async (req, res) => {
    const result = await controllers.pool.delete({
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

module.exports = PoolRoutes