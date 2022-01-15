const { Router } = require('express');
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/catagory.controller');
const { checkAuth } = require('../middleware');

const { validateGetItem, validateCreateCategory, validateUpdateCategory } = require('../validators');
const router = Router();

router.get('/category', checkAuth, getCategories);

router.get('/category/:id', validateGetItem, getCategory);

router.post('/category', validateCreateCategory, addCategory);

router.patch('/category/:id', validateUpdateCategory, updateCategory);

router.delete('/category/:id', validateGetItem, deleteCategory);

module.exports = router;