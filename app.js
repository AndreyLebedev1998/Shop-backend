import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { goodValidation } from "./validations/goodValidation.js";
import {
  createGood,
  getAllGoods,
  getOneGood,
} from "./controllers/GoodsController.js";

import {
  register,
  getMe,
  authorization,
} from "./controllers/UserController.js";

import {
  registerValidation,
  authorizationValidation,
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

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server OK http://localhost:${PORT}`);
});
