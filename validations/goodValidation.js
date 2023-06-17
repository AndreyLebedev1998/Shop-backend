import { body } from "express-validator";

export const goodValidation = [
  body("name", "Имя товара должно составлять не менее 3 символов").isLength({
    min: 3,
  }),
  body("imageUrl", "Неверная ссылка на изображение").isString(),
  body("price", "Цена должна составлять не менее 1 символа").isLength({
    min: 1,
  }),
];
