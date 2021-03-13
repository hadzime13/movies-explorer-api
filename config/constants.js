const unauthorizedError = 'Неверное имя пользователя или пароль';
const conflictError = 'Email уже используется';
const forbiddenError = 'Необходима авторизация';
const forbiddenDeleteMovieError = 'В удалении фильма другого пользователя отказано';
const notFoundUserError = 'Пользователь не найден';
const notFoundResourceError = 'Запрашиваемый ресурс не найден';
const notFoundMovieError = 'Фильма с таким ID не существует';
const badRequestIDError = 'Не передан ID пользователя';
const badRequestUserError = 'Некорректные данные пользователя';

module.exports = {
  unauthorizedError,
  conflictError,
  forbiddenError,
  notFoundUserError,
  badRequestIDError,
  badRequestUserError,
  notFoundMovieError,
  forbiddenDeleteMovieError,
  notFoundResourceError,
};
