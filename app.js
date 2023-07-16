import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";

import { goodValidation } from "./validations/goodValidation.js";
import {
  buyOneGood,
  createGood,
  getAllGoods,
  getOneGood,
  countPlusQty,
  getBasketUser,
  countMinusQty,
  deleteOneGood,
} from "./controllers/GoodsController.js";

import {
  register,
  getMe,
  authorization,
  updateUser,
  deleteAccount,
  update,
} from "./controllers/UserController.js";

import {
  registerValidation,
  authorizationValidation,
  updateUserValidation,
} from "./validations/userValidation.js";

import { validationErrors } from "./utils/validationErrors.js";
import { checkAuth } from "./utils/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://andreylebedev1998:whiteman1998@cluster0.kdqj15a.mongodb.net/dirGoods"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.error("DB error", err));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9000;
app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("This is shop");
});

app.post("/goods", goodValidation, createGood);
app.get("/goods", getAllGoods);
app.get("/goods/:id", getOneGood);

app.post("/auth/register", registerValidation, validationErrors, register);
app.get("/auth/me", checkAuth, getMe);
app.post(
  "/auth/login",
  authorizationValidation,
  validationErrors,
  authorization
);
app.patch("/auth/update/me/:id", checkAuth, updateUserValidation, updateUser);
app.delete("/auth/delete/:id", checkAuth, deleteAccount);
app.patch("/auth/me/:id", update);

app.post("/auth/basket/:id", checkAuth, buyOneGood);
app.patch("/auth/basket/plus/:id", checkAuth, countPlusQty);
app.patch("/auth/basket/minus/:id", checkAuth, countMinusQty);
app.patch("/auth/basket/delete/:id", checkAuth, deleteOneGood);
app.get("/auth/basket/:id", checkAuth, getBasketUser);

/* const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "lera.komarova.00@inbox.ru",
    pass: "T8ddq5fduyPuBMHUZZqE",
  },
});

const hello = "Пососёешь писю?";

const mailOptons = {
  from: "lera.komarova.00@inbox.ru",
  to: "andrej_lebedev98@mail.ru",
  subject: "Заказ",
  text: "Письмо пришло",
  html: `<h4>${hello}</h4>`,
};

transporter.sendMail(mailOptons); */

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server OK http://localhost:${PORT}`);
});

//dima@mail.ru
