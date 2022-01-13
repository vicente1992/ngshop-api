const { validateResult } = require('../helpers')
const { check } = require('express-validator')

const validateCreateCategory = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('icon')
    .exists()
    .not()
    .isEmpty(),
  check('color')
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateUpdateCategory = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('icon')
    .exists()
    .not()
    .isEmpty(),
  check('color')
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
const validateGetItem = [
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
  validateCreateCategory,
  validateUpdateCategory,
  validateGetItem
}