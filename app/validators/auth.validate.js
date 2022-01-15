
const { validateResult } = require('../helpers')
const { check } = require('express-validator')

const validateRegister = [

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

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateLogin = [
  check('email')
    .exists()
    .not()
    .isEmpty(),
  check('password')
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]



module.exports = {
  validateRegister,
  validateLogin
}