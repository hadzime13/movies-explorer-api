const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../errors/index');
const { notFoundMovieError, forbiddenDeleteMovieError } = require('../config/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const movieID = req.params.id;
  Movie.findById(movieID)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(notFoundMovieError);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new Forbidden(forbiddenDeleteMovieError);
      }
      return Movie.findByIdAndRemove(movieID).then(() => res.send({ message: 'Фильм успешно удален' }));
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
