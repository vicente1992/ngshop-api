const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError } = require('../helpers');
const { Types } = require('mongoose');
const orderModel = require('../models/order.model');
const orderItemModel = require('../models/order-item.model');
const { getLookOrderItem } = require('../middleware/db');


const addOrderItem = async (orderItem = []) => {
  try {
    const ordersItems = await orderItemModel.insertMany(orderItem);
    const ordersItemsIds = ordersItems.map((order) => Types.ObjectId(order._id));

    return ordersItemsIds;
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

    const data = await orderModel.find()
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}
const getOrder = async (req = request, res = response) => {
  try {
    req = matchedData(req)
    const data = await orderModel.findById({ _id: req.id })
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const addOrder = async (req = request, res = response) => {
  try {

    req = matchedData(req)
    const ordersItemsIds = await addOrderItem(req.orderItems);
    const totalPrice = await getTotalPrice(ordersItemsIds);

    req.orderItems = ordersItemsIds;
    req.totalPrice = totalPrice;

    const data = await orderModel.create(req);


    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, error)
  }
}




module.exports = {
  getOrders,
  getOrder,
  addOrder
}