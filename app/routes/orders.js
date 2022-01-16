const { Router } = require('express');
const { getOrders, getOrder, addOrder, deleteOrder, updateOrder, getTotalSales } = require('../controllers/order.controller');
const { validateGetItem, validateCreateOrder, validateUpdateOrder } = require('../validators');
const router = Router();




router.get('/order', getOrders);


router.get('/order/:id', validateGetItem, getOrder);

router.get('/order/get/TotalSales', getTotalSales);

router.post('/order', validateCreateOrder, addOrder);

router.patch('/order/:id', validateUpdateOrder, updateOrder);

router.delete('/order/:id', validateGetItem, deleteOrder);

module.exports = router;