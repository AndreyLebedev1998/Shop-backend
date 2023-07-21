import mongoose from "mongoose";

const DeliveryShema = new mongoose.Schema({
  authId: {
    type: String,
    require: true,
  },
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
  totalPrice: {
    type: String,
    require: true,
  },
  totalQty: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Delivery", DeliveryShema);
