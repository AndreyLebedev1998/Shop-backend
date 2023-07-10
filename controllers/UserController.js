import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      basket: [],
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "HelloWorld99",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const authorization = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Неправильный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "HelloWorld99",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const doc = await UserModel.findById(userId);

    const updateParams = {
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      adress: req.body.adress,
      telephone: req.body.telephone,
    };

    await doc.updateOne({
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      adress: req.body.adress,
      telephone: req.body.telephone,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Не удалось обновить данные",
    });
  }
};
