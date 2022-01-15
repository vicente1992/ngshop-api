const { Router } = require('express');
const {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  countUsers }
  = require('../controllers/user.controller');
const {
  validateGetItem,
  validateUpdateUser,
  validateCreateUser
} = require('../validators');
const router = Router();


router.get('/users', getUsers);

router.get('/users/:id', validateGetItem, getUser);

router.post('/users', validateCreateUser, addUser);

router.patch('/users/:id', validateUpdateUser, updateUser);

router.get('/users/get/count', countUsers);

router.delete('/users/:id', validateGetItem, deleteUser);




module.exports = router;