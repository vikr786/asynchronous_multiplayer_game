const express = require('express');
const router = express.Router();

const { authenticate, generateToken } = require('../utils/auth');
const { refreshToken } = require('../controllers/auth');

router.post('/refresh', authenticate, refreshToken);

module.exports = router;
