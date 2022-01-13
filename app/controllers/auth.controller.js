const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError, encrypt } = require('../helpers');
const userModel = require('../models/user.model');

const register = async (req = request, res = response) => {

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
    res.status(201).send({ data });

  } catch (error) {
    httpError(res, error)
  }

}



module.exports = {
  register
}