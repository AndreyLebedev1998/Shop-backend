import { body } from "express-validator";

export const registerValidation = [
  body("fullName", "Укажите корректное имя").isLength({ min: 3 }),
  body("email", "Неправильный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const authorizationValidation = [
  body("email", "Неправильный формат почты"),
  body("password", "Пароль должен быть не менее 5 символов").isLength({
    min: 5,
  }),
];
