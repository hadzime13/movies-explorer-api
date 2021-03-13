const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Валидация данных фильма при сохранении
const movieValidator = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'any.required': 'Страна создания - обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Режиссер - обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Продолжительность фильма должна быть числом',
        'any.required': 'Длительность - обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Год выпуска - обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Описание - обязательное поле',
      }),
    image: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка на постер');
      })
      .messages({
        'any.required': 'Ссылка на постер - обязательное поле',
      }),
    trailer: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка на трейлер');
      })
      .messages({
        'any.required': 'Ссылка на трейлер - обязательное поле',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка на миниатюру к фильму');
      })
      .messages({
        'any.required': 'Ссылка на миниатюру - обязательное поле',
      }),
    owner: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isMongoId(value)) {
          return value;
        }
        return helper.message('Невалидный ID пользователя');
      })
      .messages({
        'any.required': 'Владелец - обязательное поле',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': 'ID должен быть числом',
        'any.required': 'movieID - обязательное поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Описание на русском языке - обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Описание на английском языке - обязательное поле',
      }),
  },
});

module.exports = movieValidator;
