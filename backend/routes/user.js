const express = require('express');
const router = express.Router();

const { authenticate, generateToken } = require('../utils/auth');
const { createUser, loginUser, getUser } = require('../controllers/user');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', authenticate, getUser);

module.exports = router;
