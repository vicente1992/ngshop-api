const { Types } = require("mongoose");

const getLookOrderDetail = (model = {}, id = '') => {
  // OrderModel Padre(1)
  return model.aggregate([
    {
      $match: { _id: Types.ObjectId(id) }
    },
    {
      $lookup: {
        from: 'users',
        let: { user: '$user' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$_id', '$$user'] }
                ]
              }
            }
          }
        ],
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        orderItems: 1,
        status: 1,
        shippingAddress1: 1,
        shippingAddress2: 1,
        city: 1,
        zip: 1,
        country: 1,
        phone: 1,
        totalPrice: 1,
        dateOrdered: 1,
        userName: 1
      }
    }



  ]);
}


module.exports = {
  getLookOrderDetail
}
