const asyncHandler = require('express-async-handler')

const LeaseRoutes = ({
  controllers,
}) => {

  const list = async (req, res) => {
    const query = Object.assign({}, req.query, {
      pool: req.params.poolid,
    })
    const result = await controllers.lease.list(query)
    res.json(result)
  }

  const get = async (req, res) => {
    const result = await controllers.lease.get({
      query: {
        id: req.params.leaseid,
        pool: req.params.poolid,
      }
    })
    res.json(result)
  }

  const create = async (req, res) => {
    const result = await controllers.lease.create({
      data: Object.assign({}, req.body, {
        pool: req.params.poolid,
      })
    })
    res.json(result)
  }

  const update = async (req, res) => {
    const result = await controllers.lease.update({
      query: {
        id: req.params.leaseid,
        pool: req.params.poolid,
      },
      data: req.body,
    })
    res.json(result)
  }

  const del = async (req, res) => {
    const result = await controllers.lease.delete({
      query: {
        id: req.params.leaseid,
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

module.exports = LeaseRoutes