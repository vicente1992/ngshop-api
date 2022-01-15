const { Router } = require('express');
const {
  register,
  login
} =
  require('../controllers/auth.controller');
const {
  validateRegister,
  validateLogin
} = require('../validators');

const router = Router();


router.post('/register', validateRegister, register);

router.post('/login', validateLogin, login);


module.exports = router;