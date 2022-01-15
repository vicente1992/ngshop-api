const { validateResult } = require('../helpers')
const { check } = require('express-validator')

const validateCreateOrder = [
  check('orderItems')
    .isArray(),
  check('shippingAddress1')
    .exists()
    .not()
    .isEmpty(),
  check('shippingAddress2')
    .exists()
    .not()
    .isEmpty(),
  check('city')
    .exists()
    .not()
    .isEmpty(),
  check('zip')
    .exists()
    .not()
    .isEmpty(),
  check('country')
    .exists()
    .not()
    .isEmpty(),
  check('phone')
    .exists()
    .not()
    .isEmpty(),
  check('totalPrice')
    .exists()
    .not()
    .isEmpty(),
  check('user')
    .exists()
    .not()
    .isEmpty(),
  check('status')
    .optional(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
];



module.exports = {
  validateCreateOrder
}