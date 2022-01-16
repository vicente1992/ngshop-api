const { Schema, model } = require('mongoose');

const orderSchema = Schema({

  orderItems: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
    versionKey: false
  }
);






module.exports = model('order', orderSchema)