const {
  validateCreateProduct,
  validateUpdateProduct,
  validateGetProduct }
  = require('./products.validate');
const {
  validateCreateCategory,
  validateUpdateCategory,
  validateGetItem
} = require('./category.validate')



module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validateGetProduct,
  validateCreateCategory,
  validateUpdateCategory,
  validateGetItem
}