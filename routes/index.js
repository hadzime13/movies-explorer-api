const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth')
const { createUser, login } = require('../controllers/users');

router.post('/signin', createUser);
router.post('/signup', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
module.exports = router;
