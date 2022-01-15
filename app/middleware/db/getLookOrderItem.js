const { Types } = require('mongoose');

const getLookOrderItem = (model = {}, id = '') => {
  return model.aggregate([
    {
      $match: { _id: Types.ObjectId(id) }
    },
    {
      $lookup: {
        from: 'products',
        let: { product: '$product' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$_id', '$$product'] }
                ]
              }
            }
          }
        ],
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $group: {
        _id: '$_id',
        quantity: { $first: '$quantity' },
        priceProduct: { $first: '$product.price' }
      }
    }


  ]);
}


module.exports = {
  getLookOrderItem
}