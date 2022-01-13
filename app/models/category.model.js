const { Schema, model } = require('mongoose');


const categorySchema = Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },


},
  {
    timestamps: true,
    versionKey: false
  });



module.exports = model('category', categorySchema)