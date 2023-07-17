import DeliveryModel from "../models/Delivery.js";

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
    const deliveryId = req.params.id;

    const doc = await DeliveryModel.findById(deliveryId);

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
    const deliveryId = req.params.id;

    const doc = await DeliveryModel.findById(deliveryId);

    await doc.updateOne({
      status: "Оформлен",
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении заказа",
    });
  }
};

export const completedDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.id;

    const doc = await DeliveryModel.findById(deliveryId);

    await doc.updateOne({
      status: "Выполнен",
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении заказа",
    });
  }
};
