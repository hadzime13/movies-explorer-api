const Movie = require('../models/movie');

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
    owner,
    movieId,
  } = req.body;
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
    .catch((err) => console.log(err));
};

const deleteMovie = (req, res, next) => {
  const movieID = req.params.id;
  Movie.findById(movieID)
    .then((movie) => {
      // if (!mongoose.isValidObjectId(cardID)) {
      //   throw new BadRequest('Неверный формат ID карточки');
      // }
      // if (!card) {
      //   throw new NotFound('Карточки с таким ID не существует');
      // }
      // if (String(card.owner) !== req.user._id) {
      //   throw new Forbidden(
      //     'В удалении карточки другого пользователя отказано',
      //   );
      // }
      return Movie.findByIdAndRemove(movieID).then(() => res.send({ message: 'Фильм уcпешно удален' }));
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
