const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, JWT_TTL } = require('../config/config');
const {
  Unauthorized,
  Conflict,
  NotFound,
  BadRequest,
} = require('../errors/index');
const {
  unauthorizedError,
  conflictError,
  notFoundUserError,
  badRequestIDError,
  badRequestUserError,
} = require('../config/constants');

// Создаем пользователя
const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(conflictError);
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({ email, name, password: hash })
            .then((regUser) => {
              res.send({
                _id: regUser._id,
                name: regUser.name,
                email: regUser.email,
              });
            });
        });
    })
    .catch((err) => next(err));
};

// Аутентификация пользователя

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(unauthorizedError);
      }
      return bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Unauthorized(unauthorizedError);
        })
        .then((loggedUser) => {
          const token = jwt.sign({ _id: loggedUser._id }, JWT_SECRET, {
            expiresIn: JWT_TTL,
          });
          res.send({ token });
        });
    })

    .catch((err) => next(err));
};

// Получаем текущего пользователя
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  if (id) {
    User.findById(id)
      .then((user) => {
        if (user) {
          return res.send(user);
        }
        throw new NotFound(notFoundUserError);
      })
      .catch((err) => next(err));
  }
  return new BadRequest(badRequestIDError);
};

// Обновляем данные пользователя
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new BadRequest(badRequestUserError);
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUser,
  login,
};
