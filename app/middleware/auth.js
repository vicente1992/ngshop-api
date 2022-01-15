const { verifyToken } = require('../helpers');
const userModel = require('../models/user.model');


const checkAuth = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      res.status(409)
      return res.send({ error: 'No existe un token' });
    }

    token = req.headers.authorization.replace('Bearer ', '').trim()

    const tokenData = await verifyToken(token)
    if (!tokenData) {
      res.status(409)
      return res.send({ error: 'Tu por aqui no pasas!' });
    }
    let userData = await userModel.findById(tokenData._id);
    delete userData.password
    req.user = userData
    if (tokenData._id) {
      next()
    } else {
      res.status(409)
      return res.send({ error: 'Tu por aqui no pasas!' })
    }

  } catch (e) {
    console.log(e)
    res.status(409)
    res.send({ error: 'Tu por aqui no pasas!' })
  }

}

module.exports = { checkAuth };