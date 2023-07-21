import GoodModel from "../models/Good.js";
import UserModel from "../models/User.js";

export const createGood = async (req, res) => {
  try {
    const doc = new GoodModel({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      categoryId: req.body.categoryId,
    });

    const good = await doc.save();

    res.json(good);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось создать товар",
    });
  }
};

export const getAllGoods = async (req, res) => {
  try {
    const goods = await GoodModel.find().exec();

    res.json(goods);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось загрузить товары",
    });
  }
};

export const getOneGood = async (req, res) => {
  try {
    const id = req.params.id;

    GoodModel.findById(id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Товар не найден",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Не удалось получить товар",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось найти товар",
    });
  }
};

export const buyOneGood = async (req, res) => {
  try {
    const userId = req.params.id;
    const basket = {
      id: req.body.id,
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      categoryId: req.body.categoryId,
      qtyInBasket: req.body.qtyInBasket,
    };

    const doc = await UserModel.findById(userId);

    await doc.updateOne({
      $addToSet: {
        basket,
      },
    });

    /* await UserModel.findOneAndUpdate({
      _id: userId,
      $addToSet: {
        basket,
      },
    }); */

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось добавить товар",
    });
  }
};

export const countPlusQty = async (req, res) => {
  try {
    const userId = req.params.id;
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "basket.id": req.body.id,
      },
      {
        $inc: {
          "basket.$.qtyInBasket": 1,
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось обновить товар",
    });
  }
};

export const countMinusQty = async (req, res) => {
  try {
    const userId = req.params.id;
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "basket.id": req.body.id,
      },
      {
        $inc: {
          "basket.$.qtyInBasket": -1,
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось обновить товар",
    });
  }
};

export const getBasketUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const doc = await UserModel.findById(userId);

    res.json(doc.basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось получить корзину",
    });
  }
};

export const deleteOneGood = async (req, res) => {
  try {
    const userId = req.params.id;

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          basket: {
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
      message: "Не удалось удалить корзину",
    });
  }
};

export const update = async (req, res) => {
  try {
    const goodId = req.params.id;

    await GoodModel.updateOne(
      {
        _id: goodId,
      },
      {
        qtyInBasket: 0,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Не удалось обновить товар",
    });
  }
};

export const deleteAllGoods = async (req, res) => {
  try {
    const userId = req.params.id;

    const doc = await UserModel.findById(userId);

    await doc.updateOne({
      $set: {
        basket: [],
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Не удалось отчистить корзину",
    });
  }
};
