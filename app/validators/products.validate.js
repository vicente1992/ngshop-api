const { validateResult } = require('../helpers')
const { check } = require('express-validator')

const validateCreateProduct = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('description')
    .exists()
    .not()
    .isEmpty(),
  check('richDescription')
    .optional(),
  check('image')
    .exists()
    .not()
    .isEmpty(),
  check('images')
    .optional(),
  check('brand')
    .optional(),
  check('price')
    .exists()
    .not()
    .isEmpty(),
  check('category')
    .exists()
    .not()
    .isEmpty(),
  check('countInStock')
    .exists()
    .not()
    .isEmpty(),
  check('rating')
    .exists()
    .not()
    .isEmpty(),
  check('numReviews')
    .exists()
    .not()
    .isEmpty(),
  check('isFeatured')
    .optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateUpdateProduct = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('description')
    .exists()
    .not()
    .isEmpty(),
  check('richDescription')
    .optional(),
  check('image')
    .exists()
    .not()
    .isEmpty(),
  check('images')
    .exists()
    .not()
    .isEmpty(),
  check('brand')
    .optional(),
  check('price')
    .exists()
    .not()
    .isEmpty(),
  check('category')
    .exists()
    .not()
    .isEmpty(),
  check('countInStock')
    .exists()
    .not()
    .isEmpty(),
  check('rating')
    .exists()
    .not()
    .isEmpty(),
  check('numReviews')
    .exists()
    .not()
    .isEmpty(),
  check('isFeatured')
    .exists()
    .not()
    .isEmpty(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
/**
 * Validates get item request
 */
const validateGetProduct = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  validateCreateProduct,
  validateGetProduct,
  validateUpdateProduct
}