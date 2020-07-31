const asyncHandler = require('express-async-handler')

const VmRoutes = ({
  controllers,
}) => {

  const list = async (req, res) => {
    const query = Object.assign({}, req.query, {
      pool: req.params.poolid,
    })
    const result = await controllers.vm.list(query)
    res.json(result)
  }

  const get = async (req, res) => {
    const result = await controllers.vm.get({
      query: {
        id: req.params.vmid,
        pool: req.params.poolid,
      }
    })
    res.json(result)
  }

  const create = async (req, res) => {
    const result = await controllers.vm.create({
      data: Object.assign({}, req.body, {
        pool: req.params.poolid,
      })
    })
    res.json(result)
  }

  const update = async (req, res) => {
    const result = await controllers.vm.update({
      query: {
        id: req.params.vmid,
        pool: req.params.poolid,
      },
      data: req.body,
    })
    res.json(result)
  }

  const del = async (req, res) => {
    const result = await controllers.vm.delete({
      query: {
        id: req.params.vmid,
        pool: req.params.poolid,
      }
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

module.exports = VmRoutes