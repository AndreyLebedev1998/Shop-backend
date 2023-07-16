import mongoose from "mongoose";

const DeliveryShema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  telephone: {
    type: String,
    require: false,
  },
  delivery: {
    type: Array,
    require: true,
  },
});

export default mongoose.Model("Delivery", DeliveryShema);
