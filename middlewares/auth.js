const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors/index');
const { forbiddenError } = require('../config/constants');
const { JWT_SECRET } = require('../config/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden(forbiddenError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Forbidden(forbiddenError);
  }
  req.user = payload;
  next();
};

module.exports = auth;
