const { Router } = require('express');
const { getOrders, getOrder, addOrder } = require('../controllers/order.controller');
const { validateGetItem, validateCreateOrder } = require('../validators');
const router = Router();




router.get('/order', getOrders);

router.get('/order/:id', validateGetItem, getOrder);

router.post('/order', validateCreateOrder, addOrder);

module.exports = router;