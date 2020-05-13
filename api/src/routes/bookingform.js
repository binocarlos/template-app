const asyncHandler = require('express-async-handler')

const BookingFormRoutes = ({
  controllers,
}) => {

  const list = async (req, res) => {
    const result = await controllers.bookingform.list({
      userid: req.user.id,
    })
    res.json(result)
  }

  const get = async (req, res) => {
    const result = await controllers.bookingform.get({
      userid: req.user.id,
      id: req.params.id
    })
    res.json(result)
  }

  const create = async (req, res) => {
    const result = await controllers.bookingform.create({
      userid: req.user.id,
      data: req.body,
    })
    res.json(result)
  }

  const update = async (req, res) => {
    const result = await controllers.bookingform.update({
      userid: req.user.id,
      id: req.params.id,
      data: req.body,
    })
    res.json(result)
  }

  const del = async (req, res) => {
    const result = await controllers.bookingform.delete({
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

module.exports = BookingFormRoutes