const { Router } = require('express');
const {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser }
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


router.delete('/users/:id', validateGetItem, deleteUser);




module.exports = router;