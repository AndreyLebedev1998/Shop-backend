import DeliveryModel from "../models/Delivery.js";
import UserModel from "../models/User.js";

export const createDelivery = async (req, res) => {
  try {
    const doc = new DeliveryModel({
      id: req.body.id,
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      email: req.body.email,
      adress: req.body.adress,
      telephone: req.body.telephone,
      delivery: req.body.delivery,
      totalPrice: req.body.totalPrice,
      totalQty: req.body.totalQty,
      status: req.body.status,
    });

    const delivery = await doc.save();

    res.json(delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при заказе",
    });
  }
};

export const getAllDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryModel.find().exec();

    res.json(delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось получить информацию о доставках",
    });
  }
};

export const getOneDelivery = async (req, res) => {
  try {
    const userId = req.body.authId;

    const doc = await UserModel.findById(
      {
        _id: userId,
      },
      {
        delivery: { $elemMatch: { id: req.body.id } },
      }
    );

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при получении заказа",
    });
  }
};

export const framedDelivery = async (req, res) => {
  try {
    const userId = req.body.authId;

    const doc = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "delivery.id": req.body.id,
      },
      {
        $set: {
          "delivery.$.status": "Оформлен",
        },
      }
    );

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении заказа",
    });
  }
};
//Свердловская область, Новоуральск, Автозаводская улица, 21

export const completedDelivery = async (req, res) => {
  try {
    const userId = req.body.authId;

    const doc = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "delivery.id": req.body.id,
      },
      {
        $set: {
          "delivery.$.status": "Выполнен",
        },
      }
    );

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении заказа",
    });
  }
};

export const deleteDelivery = async (req, res) => {
  try {
    const userId = req.body.authId;
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          delivery: {
            id: req.body.id,
          },
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось отменить заказ",
    });
  }
};

export const addDeliveryInUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const delivery = {
      authId: req.params.id,
      id: req.body.id,
      fullName: req.body.fullName,
      lastName: req.body.lastName,
      email: req.body.email,
      adress: req.body.adress,
      telephone: req.body.telephone,
      delivery: req.body.delivery,
      totalPrice: req.body.totalPrice,
      totalQty: req.body.totalQty,
      status: req.body.status,
    };

    const user = await UserModel.findById(userId);

    await user.updateOne({
      $push: {
        delivery,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось добавить заказы",
    });
  }
};

export const getAllDeliveryUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const doc = await UserModel.findById(userId);

    res.json(doc.delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const deliveryUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const doc = await UserModel.findById(userId);

    res.json(doc.delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при полученни доставок",
    });
  }
};
