const express = require('express');
const router = express.Router();

const { authenticate } = require('../utils/auth');
const { createGame, getGame, updateGame } = require('../controllers/game');

router.post('/', authenticate, createGame);
router.get('/:id', authenticate, getGame);
router.put('/:id', authenticate, updateGame);

module.exports = router;
