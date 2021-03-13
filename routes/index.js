const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { userValidator } = require('../middlewares/validators/index');

router.post('/signup', userValidator, createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
module.exports = router;
