import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true },
  author: { type: String, required: true},
  availabilitystatus: { type: String, default: "Available"}
});

export const BookModel =  mongoose.model("Books", BookSchema);