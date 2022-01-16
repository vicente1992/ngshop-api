const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError } = require('../helpers');
const { Types } = require('mongoose');
const orderModel = require('../models/order.model');
const orderItemModel = require('../models/order-item.model');
const { getLookOrderItem, getLookOrders, getLookOrderDetail, getLookOrderItemDetail } = require('../middleware/db');


const addOrderItems = async (orders = []) => {
  try {
    const ordersItems = await orderItemModel.insertMany(orders);
    const ordersItemsIds = ordersItems.map((order) => Types.ObjectId(order._id));
    return { ordersItems, ordersItemsIds };
  } catch (error) {
    throw error;
  }
}

const getTotalPrice = async (ordersItemsIds = []) => {


  const totalPrices = await Promise.all(ordersItemsIds.map(async (orderItemId) => {

    const [orderItem] = await getLookOrderItem(orderItemModel, orderItemId);
    const totalPrice = orderItem.priceProduct * orderItem.quantity;
    return totalPrice
  }))

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  return totalPrice;
}

const getOrders = async (req = request, res = response) => {
  try {

    const data = await getLookOrders(orderModel)
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, error)
  }
}
const getOrder = async (req = request, res = response) => {
  try {
    req = matchedData(req)

    const [order] = await getLookOrderDetail(orderModel, req.id);

    const orderItems = await Promise.all(order.orderItems.map(async (orderItemId) => {
      const orderItem = await getLookOrderItemDetail(orderItemModel, orderItemId);

      return orderItem.pop()

    }))
    order.orderItems = orderItems;

    res.status(200).send({ data: order })
  } catch (error) {
    console.log(error);
    httpError(res, error)
  }
}

const addOrder = async (req = request, res = response) => {
  try {

    req = matchedData(req)
    const { ordersItems, ordersItemsIds } = await addOrderItems(req.orderItems);
    const totalPrice = await getTotalPrice(ordersItemsIds);

    req.orderItems = ordersItems;
    req.totalPrice = totalPrice;

    const data = await orderModel.create(req);


    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, error)
  }
}
const updateOrder = async (req = request, res = response) => {
  try {

    req = matchedData(req)
    const data = await orderModel.findByIdAndUpdate(req.id, req, {
      new: true,
      runValidators: true
    });

    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, error)
  }
}

const deleteOrder = async (req = request, res = response) => {
  try {

    req = matchedData(req);
    const orderDelted = await orderModel.findByIdAndRemove(req.id);
    const orderItemids = orderDelted.orderItems.map((orderItem) => Types.ObjectId(orderItem))
    await orderItemModel.deleteMany({ _id: { $in: orderItemids } })
    res.send({ msg: 'DELETED' });

  } catch (error) {
    httpError(res, error)
  }
}
const getTotalSales = async (req = request, res = response) => {
  try {

    const totalSales = await orderModel.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales) {
      return res.status(400).send('The order sales cannot be generated')
    }
    res.send({ data: totalSales.pop() });

  } catch (error) {
    httpError(res, error)
  }
}




module.exports = {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  updateOrder,
  getTotalSales
}