const BookingFormController = ({
  store,
}) => {
  
  const list = async ({
    userid,
  }) => store.bookingform.list({
    userid,
  })

  const get = async ({
    userid,
    id,
  }) => store.bookingform.get({
    userid,
    id,
  })

  const create = async ({
    userid,
    data,
  }) => store.bookingform.create({
    userid,
    data,
  })

  const update = async ({
    userid,
    id,
    data,
  }) => store.bookingform.update({
    userid,
    id,
    data,
  })

  const del = async ({
    userid,
    id,
  }) => store.bookingform.delete({
    userid,
    id,
  })

  return {
    list,
    get,
    create,
    update,
    delete: del,
  }
}

module.exports = BookingFormController