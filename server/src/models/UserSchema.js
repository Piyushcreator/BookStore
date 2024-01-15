import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true,unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber:  { type: Number, required: true,unique: true },
  role:{type: String, default: "user"}
});

export const UserModel= mongoose.model("Users", UserSchema);