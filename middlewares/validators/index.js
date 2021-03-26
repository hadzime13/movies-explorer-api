const { userValidator, userUpdateValidator, authValidator } = require('./userValidator');
const movieValidator = require('./movieValidator');
const idValidator = require('./idValidator');

module.exports = {
  userValidator,
  userUpdateValidator,
  authValidator,
  movieValidator,
  idValidator,
};
