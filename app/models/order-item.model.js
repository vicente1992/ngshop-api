const { Schema, model } = require('mongoose');


const orderItemSchema = Schema({

  quantity: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true
  },


});






module.exports = model('orderItem', orderItemSchema)