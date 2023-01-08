const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticate(req, res, next) {
  try {
    // Extract token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports = authenticate;
