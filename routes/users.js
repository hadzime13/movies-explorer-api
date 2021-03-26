const userRouter = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { userUpdateValidator } = require('../middlewares/validators/index');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', userUpdateValidator, updateUser);

module.exports = userRouter;
