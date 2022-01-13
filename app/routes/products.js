const { Router } = require('express');
const {
  getProducts,
  addProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  countProducts
}
  = require('../controllers/product.controller');
const {
  validateCreateProduct,
  validateGetProduct,
  validateUpdateProduct
}
  = require('../validators');

const router = Router();

router.get('/products', getProducts);

router.get('/products/:id', validateGetProduct, getProduct);

router.get('/products/get/count', countProducts);

router.post('/products', validateCreateProduct, addProducts);

router.patch('/products/:id', validateUpdateProduct, updateProduct);

router.delete('/products/:id', validateGetProduct, deleteProduct);

module.exports = router;