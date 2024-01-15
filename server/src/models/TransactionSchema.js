import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userName : { type: String, required: true },
    bookName : { type: String, required: true },
    dueDate :{type:String, required: true},
    transactiontype:  { type: String,default: "Issue Book" },
});

export const TransactionModel =mongoose.model("Library_Transaction", TransactionSchema);