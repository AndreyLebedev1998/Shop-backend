import express from "express";
import mongoose from "mongoose";
import cors from "cors";

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
  deleteAllGoods,
} from "./controllers/GoodsController.js";

import {
  register,
  getMe,
  authorization,
  updateUser,
  deleteAccount,
  update,
  getAllUsersDelivery,
} from "./controllers/UserController.js";

import {
  addDeliveryInUser,
  completedDelivery,
  deleteDelivery,
  deliveryUser,
  framedDelivery,
  getAllDeliveryUser,
  getOneDelivery,
} from "./controllers/DeliveryController.js";

import {
  registerValidation,
  authorizationValidation,
  updateUserValidation,
} from "./validations/userValidation.js";

import { validationErrors } from "./utils/validationErrors.js";
import { checkAuth } from "./utils/checkAuth.js";

const SERVER_IP_ADDRESS = "31.129.101.151";
const uri = `mongodb://127.0.0.1:27017/dirGoods`;

mongoose
  .connect(
    /*  "mongodb+srv://andreylebedev1998:whiteman1998@cluster0.kdqj15a.mongodb.net/dirGoods" || */
    uri
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.error("DB error", err));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9001;
app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("This is shop");
});

//Запросы на товары
app.post("/goods", goodValidation, createGood);
app.get("/goods", getAllGoods);
app.get("/goods/:id", getOneGood);

//Запросы на действия с пользователем
app.post("/auth/register", registerValidation, validationErrors, register);
app.get("/auth/me", checkAuth, getMe);
app.post(
  "/auth/login",
  authorizationValidation,
  validationErrors,
  authorization
);
app.patch(
  "/auth/update/me/:id",
  updateUserValidation,
  validationErrors,
  checkAuth,
  updateUser
);
app.delete("/auth/delete/:id", checkAuth, deleteAccount);
app.patch("/auth/me/:id", update);

//Запросы на действия с корзиной
app.post("/auth/basket/:id", checkAuth, buyOneGood);
app.patch("/auth/basket/plus/:id", checkAuth, countPlusQty);
app.patch("/auth/basket/minus/:id", checkAuth, countMinusQty);
app.patch("/auth/basket/delete/:id", checkAuth, deleteOneGood);
app.get("/auth/basket/:id", checkAuth, getBasketUser);
app.patch("/auth/basket/deleteAll/:id", checkAuth, deleteAllGoods);

//Запросы на действия с доставкой
app.patch("/deliveryOne", checkAuth, getOneDelivery);
app.patch("/delivery/framed", checkAuth, framedDelivery);
app.patch("/delivery/completed", checkAuth, completedDelivery);
app.patch("/delivery/delete", checkAuth, deleteDelivery);
app.patch("/delivery/addDelivery/:id", checkAuth, addDeliveryInUser);
app.get("/delivery/userDelivery/:id", checkAuth, getAllDeliveryUser);
app.get("/allUsersDelivery", checkAuth, getAllUsersDelivery);
app.get("/deliveryUser/:id", checkAuth, deliveryUser);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server OK http://localhost:${PORT}`);
});

//dima@mail.ru
