const { celebrate, Joi } = require('celebrate');

// Валидация данных пользователя при создании
const userValidator = celebrate({
  body: {
    email: Joi.string().email().required({ minDomainSegments: 2 }).messages({
      'string.email': 'Невалидный email',
      'any.required': 'Email - обязательное поле',
    }),
    password: Joi.string().min(6).max(30).required()
      .messages({
        'string.min': 'Поле "Пароль" - минимум 6 символов',
        'string.max': 'Поле "Пароль" - максимум 30 символов',
        'any.required': 'Пароль - обязательное поле',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "Имя" - минимум 2 символа',
        'string.max': 'Поле "Имя" - максимум 30 символов',
        'any.required': 'Имя - обязательное поле',
      }),
  },
});
// Валидация данных пользователя при изменении
const userUpdateValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Поле "Имя" - минимум 2 символа',
        'string.max': 'Поле "Имя" - максимум 30 символов',
        'any.required': 'Имя - обязательное поле',
      }),
    email: Joi.string().email().required({ minDomainSegments: 2 }).messages({
      'string.email': 'Невалидный email',
      'any.required': 'Email - обязательное поле',
    }),
  },
});

module.exports = {
  userValidator,
  userUpdateValidator,
};
