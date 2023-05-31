const express = require('express');
const {
  deleteUser,
  getUser,
  getUsers,
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../middleware/jwt.js');
const router = express.Router();

router.delete('/:id', verifyToken, deleteUser);
router.get('/:id', getUser);
router.get('/', getUsers);
module.exports = router;
