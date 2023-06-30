import mongoose from "mongoose";

const GoodShema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  categoryId: Number,
});

export default mongoose.model("Good", GoodShema);