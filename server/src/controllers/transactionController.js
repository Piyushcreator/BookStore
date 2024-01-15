import {TransactionModel} from '../models/TransactionSchema.js';
import {UserModel} from '../models/UserSchema.js';
import { BookModel } from '../models/BookSchema.js';

export const addTransaction = async (req, res) =>{
   try {
      const{userName,bookName,dueDate,transactiontype} =req.body;

      
      const user= await TransactionModel.findOne({userName :userName,bookName:bookName});
      
      if(user){
          return res.json({message: "Transacation Already exists!"});
      }
  
      const newTranasaction= new TransactionModel({userName, bookName, dueDate,transactiontype});
      await newTranasaction.save()
      const newAvailabilityStatus = !transactiontype? "Not Available":(transactiontype=== "Issue Book" ? "Not Available":"Available")
      const updatedbook = await BookModel.updateOne(
         { name: bookName },
         { $set: { availabilitystatus: newAvailabilityStatus } })
      return res.status(200).json({message:"Transacation Added Successfully!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   }
     

 }
 
 export const getTransaction = async (req, res) =>{
   const id= req.params.id;
   try {
     const Transaction =await TransactionModel.findById(id);
     if(Transaction){
       res.
      status(200)
      .json({
        success:true,
        message: "Tranasaction Found",
        data: Transaction
      });}
     else
      res.status(404).json({success: false,message: "No Data Found!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const getAllTransactions = async (req, res) =>{
   try {
    const Transactions = await TransactionModel.find({})
    if(Transactions.length>0){
      res.status(200).json({success:true,message:"Transactions Found!", data:Transactions});
    }
    else{ res.status(404).json({success:false,message:"Not Found!"})
   }
   } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const getAllTransactionsUser = async (req, res) =>{
   const id= req.params.id;
   try {
   const targetUser = await UserModel.findById(id, 'userName');
    const Transactions = await TransactionModel.find({ userName: targetUser.userName });
    if(Transactions.length>0){
      res.status(200).json({success:true,message:"Transactions Found!", data:Transactions});
    }
    else{ res.status(404).json({success:false,message:"Not Found!"})
   }
   } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const updateTransaction = async (req, res) =>{
   const id= req.params.id;
   try {
      const updateTransaction= await TransactionModel.findByIdAndUpdate(id, {$set:req.body},{new:true}).populate('userName').populate('bookName');
      if(updateTransaction){
        res.status(200).json({success:true,message:"Successfully Updated!",data:updateTransaction });
      }
       else{ res.status(404).json({success:false,message:"Failed to Update!"});
      }
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const deleteTransaction = async (req, res) =>{
   const id= req.params.id;
   try {
       await TransactionModel.findByIdAndDelete(id);
       return res.status(200).json({success:true,message:"Successfully Deleted!"});
    
   } catch (error) {
       res.status(500).json({success:false,message:"Failed to Delete!",error});
   } 
   
}