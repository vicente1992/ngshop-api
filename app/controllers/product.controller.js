const { request, response } = require('express');
const { matchedData } = require('express-validator');
const mongoose = require('mongoose');
const { httpError } = require('../helpers');
const { getLookProducts } = require('../middleware/db');
const productModel = require('../models/product.model');


const getProducts = async (req = request, res = response) => {
  try {

    let query = req.query ?? {};

    if (query.isFeatured) {
      query = {
        isFeatured: query.isFeatured === 'true' ? true : false,
      }
    }

    if (query.category) {
      query = {
        category: mongoose.Types.ObjectId(query.category)
      }
    }

    const data = await getLookProducts(query);
    res.status(200).send({ data });

  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const getProduct = async (req = request, res = response) => {
  try {

    req = matchedData(req);
    const query = {
      _id: mongoose.Types.ObjectId(req.id)
    }

    const [data = null] = await getLookProducts(query);
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const addProducts = async (req = request, res = response) => {

  try {
    req = matchedData(req)
    const data = await productModel.create(req)
    res.status(201).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const updateProduct = async (req = request, res = response) => {
  try {
    req = matchedData(req)
    const data = await productModel.findByIdAndUpdate(req.id, req, {
      new: true,
      runValidators: true
    })
    res.send({ data })
  } catch (e) {
    httpError(res, e)
  }
}

const countProducts = async (req = request, res = response) => {
  try {

    const data = await productModel.find();
    res.send({ data: data.length });
  } catch (e) {
    httpError(res, e)
  }
}

const deleteProduct = async (req = request, res = response) => {
  try {
    req = matchedData(req);
    await productModel.findByIdAndRemove(req.id);
    res.send({ msg: 'DELETED' });
  } catch (e) {
    httpError(res, e);
  }
}



module.exports = {
  getProducts,
  getProduct,
  addProducts,
  deleteProduct,
  updateProduct,
  countProducts
}