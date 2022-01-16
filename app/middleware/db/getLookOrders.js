
const getLookOrders = (model = {}, query = {}) => {
  return model.aggregate([
    {
      $match: query
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
      $group: {
        _id: '$_id',
        orderItems: { $first: '$orderItems' },
        status: { $first: '$status' },
        shippingAddress1: { $first: '$shippingAddress1' },
        shippingAddress2: { $first: '$shippingAddress2' },
        city: { $first: '$city' },
        zip: { $first: '$zip' },
        country: { $first: '$country' },
        phone: { $first: '$phone' },
        totalPrice: { $first: '$totalPrice' },
        dateOrdered: { $first: '$dateOrdered' },
        userName: { $first: '$user.name' }
      }
    },
    {
      $sort: { dateOrdered: -1 }
    }


  ]);
}


module.exports = {
  getLookOrders
}
