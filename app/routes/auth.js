const { Router } = require('express');
const {
  register
} =
  require('../controllers/auth.controller');
const {
  validateRegister
} = require('../validators');

const router = Router();


router.post('/register', validateRegister, register);


module.exports = router;