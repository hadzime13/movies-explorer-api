const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { userValidator, authValidator } = require('../middlewares/validators/index');
const { NotFound } = require('../errors/index');
const { notFoundResourceError } = require('../config/constants');

router.post('/signup', userValidator, createUser);
router.post('/signin', authValidator, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.all('*', () => {
  throw new NotFound(notFoundResourceError);
});
module.exports = router;
