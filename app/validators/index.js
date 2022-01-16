const {
  validateCreateProduct,
  validateUpdateProduct,
  validateGetProduct }
  = require('./products.validate');
const {
  validateCreateCategory,
  validateUpdateCategory,
  validateGetItem
} = require('./category.validate');
const {
  validateRegister,
  validateLogin
} = require('./auth.validate');
const { validateCreateUser, validateUpdateUser } = require('./user.validate');
const { validateCreateOrder, validateUpdateOrder } = require('./order.validate');



module.exports = {
  validateCreateCategory,
  validateCreateProduct,
  validateCreateUser,
  validateGetItem,
  validateGetProduct,
  validateRegister,
  validateUpdateCategory,
  validateUpdateProduct,
  validateUpdateUser,
  validateLogin,
  validateCreateOrder,
  validateUpdateOrder
}