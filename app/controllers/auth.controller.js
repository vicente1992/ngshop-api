const { request, response } = require('express');
const { matchedData } = require('express-validator');
const { httpError, encrypt, compare, tokenSign, setUserInfo } = require('../helpers');
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
    res.status(201).send({ data: await setUserInfo(data) });

  } catch (error) {
    httpError(res, error)
  }

}

const login = async (req = request, res = response) => {
  try {
    req = matchedData(req)
    const userDB = await userModel.findOne({ email: req.email });

    if (!userDB) {
      res.status(404)
      return res.send({ error: 'Email no existe' });
    }

    const checkPassword = await compare(req.password, userDB.password);

    const tokenSession = await tokenSign(userDB)

    if (checkPassword) {
      const data = {
        user: await setUserInfo(userDB),
        token: tokenSession
      }
      return res.send({ data })
    }

    if (!checkPassword) {
      res.status(409)
      return res.send({
        error: 'Invalid password'
      })

    }

  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  register,
  login
}