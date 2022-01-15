
const { validateResult } = require('../helpers')
const { check } = require('express-validator')

const validateCreateUser = [

  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('email')
    .exists()
    .not()
    .isEmpty(),
  check('password')
    .exists()
    .not()
    .isEmpty(),
  check('phone')
    .exists()
    .not()
    .isEmpty(),
  check('street')
    .optional(),
  check('apartament')
    .optional(),
  check('city')
    .optional(),
  check('zip')
    .optional(),
  check('street')
    .optional(),
  check('country')
    .optional(),
  check('isAdmin')
    .optional(),
  check('role')
    .optional(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateUpdateUser = [

  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('email')
    .exists()
    .not()
    .isEmpty(),
  check('password')
    .exists()
    .not()
    .isEmpty(),
  check('phone')
    .exists()
    .not()
    .isEmpty(),
  check('street')
    .optional(),
  check('apartament')
    .optional(),
  check('city')
    .optional(),
  check('zip')
    .optional(),
  check('street')
    .optional(),
  check('country')
    .optional(),
  check('isAdmin')
    .optional(),
  check('role')
    .optional(),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


module.exports = {
  validateCreateUser,
  validateUpdateUser,
}