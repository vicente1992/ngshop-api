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

const getLookOrderItemDetail = (model = {}, id = '') => {
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
    {
      $lookup: {
        from: 'categories',
        localField: 'product.category',
        foreignField: '_id',
        as: 'category'
      }
    },
    { $unwind: '$product' },
    { $unwind: '$category' },

    // {
    //   $group: {
    //     _id: '$_id',
    //     quantity: { $first: '$quantity' },
    //     price: { $first: '$product.price' },
    //     price: { $first: '$product.price' },
    //     price: { $first: '$product.price' },
    //   }
    // }


  ]);
}


module.exports = {
  getLookOrderItem,
  getLookOrderItemDetail
}