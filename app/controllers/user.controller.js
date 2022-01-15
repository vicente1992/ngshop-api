const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError, encrypt, setUserInfo } = require('../helpers');
const userModel = require('../models/user.model');


const getUsers = async (req = request, res = response) => {
  try {

    const data = await userModel.find()
    res.status(200).send({ data })
  } catch (error) {
    console.log(error);
    httpError(res, e)
  }
}
const getUser = async (req = request, res = response) => {
  try {

    req = matchedData(req)
    const data = await userModel.findById({ _id: req.id })
    res.status(200).send({ data })
  } catch (e) {
    httpError(res, e)
  }
}

const addUser = async (req = request, res = response) => {

  try {
    req = matchedData(req);
    const userExists = await userModel.findOne({ email: req.email });

    if (userExists) {
      res.status(422)
      return res.send({ error: `EL email ${req.email} ya esta en uso` });
    }

    const passwordHash = await encrypt(req.password);
    req.password = passwordHash;
    const data = await userModel.create(req);
    res.status(201).send({ data: await setUserInfo(data) });
  } catch (e) {
    httpError(res, e)
  }
}

const updateUser = async (req, res) => {
  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password);
    req.password = passwordHash;
    const data = await userModel.findByIdAndUpdate(req.id, req, {
      new: true,
      runValidators: true
    })
    res.send({ data: await setUserInfo(data) });
  } catch (e) {
    httpError(res, e)
  }
}

const countUsers = async (req = request, res = response) => {
  try {

    const data = await userModel.find();
    res.send({ data: data.length });
  } catch (e) {
    httpError(res, e)
  }
}

const deleteUser = async (req, res) => {
  try {
    req = matchedData(req)
    await userModel.findByIdAndRemove(req.id)
    res.send({ msg: 'DELETED' })
  } catch (e) {
    httpError(res, e)
  }
}


module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  countUsers,
}