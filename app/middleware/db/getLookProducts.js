const productModel = require('../../models/product.model');

const getLookProducts = (query = {}) => {
  return productModel.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: 'categories',
        let: { category: '$category' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$_id', '$$category'] }
                ]
              }
            }
          }
        ],
        as: 'category'
      }
    },
    { $unwind: '$category' },


  ]);
}


module.exports = {
  getLookProducts
}