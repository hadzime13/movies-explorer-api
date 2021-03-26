const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidator, idValidator } = require('../middlewares/validators/index');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieValidator, createMovie);
movieRouter.delete('/:id', idValidator, deleteMovie);

module.exports = movieRouter;
