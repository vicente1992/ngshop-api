const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError } = require('../helpers');
const categoryModel = require('../models/category.model');


const getCategories = async (req = request, res = response) => {
  try {

    const data = await categoryModel.find()
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const getCategory = async (req = request, res = response) => {
  try {

    req = matchedData(req)
    const data = await categoryModel.findById({ _id: req.id })
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const addCategory = async (req = request, res = response) => {

  try {
    req = matchedData(req)
    const data = await categoryModel.create(req)
    res.status(201).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}

const updateCategory = async (req, res) => {
  try {
    req = matchedData(req);
    const data = await categoryModel.findByIdAndUpdate(req.id, req, {
      new: true,
      runValidators: true
    })
    res.send({ data });
  } catch (e) {
    httpError(res, e)
  }
}

const deleteCategory = async (req, res) => {
  try {
    req = matchedData(req)
    await categoryModel.findByIdAndRemove(req.id)
    res.send({ msg: 'DELETED' })
  } catch (e) {
    httpError(res, e)
  }
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}