import bcrypt from 'bcrypt'
import {UserModel} from '../models/UserSchema.js';
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) =>{
   const id= req.params.id;
   try {
     const user =await UserModel.findById(id).select("-password");
     if(user){
      res.
     status(200)
     .json({
       success:true,
       message: "User Found",
       data: user
     });}
     else
      res.status(404).json({success: false,message: "No User Found!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const getAllUsers = async (req, res) =>{
   try {
    const users = await UserModel.find({});
    if(users.length>0)
      res.status(200).json({success:true,message:"Users Found!", data:users});
    else
     res.status(404).json({success:false,message:"Not Found!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const updateUser = async (req, res) =>{
   const id= req.params.id;
   try {
       const updateUser= await UserModel.findByIdAndUpdate(id, {$set:req.body},{new:true}).select("-password");
       if(updateUser)
       res.status(200).json({success:true,message:"Successfully Update!", data:updateUser});
       else
       res.status(404).json({success:false,message:"Failed to Update!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const deleteUser = async (req, res) =>{
   const id= req.params.id;
   try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Successfully Deleted!"});
    
   } catch (error) {
       res.status(500).json({success:false,message:"Failed to Delete!",error});
   } 
}

export const getAllUserNames =  async (req, res) =>{
   try {
      const users = await UserModel.find({}, 'userName');
      if(users.length>0)
        res.status(200).json({success:true,message:"Users Found!", data:users});
      else
       res.status(404).json({success:false,message:"Not Found!"});
     } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
     } 
}

