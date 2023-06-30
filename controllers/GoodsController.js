import GoodModel from "../models/Good.js";

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
