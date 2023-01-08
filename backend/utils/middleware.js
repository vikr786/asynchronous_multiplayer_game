const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const token = authorizationHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = { authenticate };
