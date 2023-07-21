import mongoose from "mongoose";

const UserShema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  basket: {
    type: Array,
    require: true,
  },
  lastName: {
    type: String,
    require: false,
  },
  gender: {
    type: String,
    require: false,
  },
  telephone: {
    type: String,
    require: false,
  },
  admin: {
    type: Boolean,
    require: false,
  },
  delivery: {
    type: Array,
    require: true,
  },
});

export default mongoose.model("User", UserShema);
