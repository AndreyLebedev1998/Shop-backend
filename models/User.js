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
});

export default mongoose.model("User", UserShema);
