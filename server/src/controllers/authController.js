import {UserModel} from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register= async (req, res) => {
    try {
        let user= await UserModel.findOne({ userName :req.body?.userName});
        if(user){
            return res.status(404).json({message: "UserName Already exists!"});
        }
        user= await UserModel.findOne({ email :req.body?.email});
        if(user){
            return res.status(404).json({message: "Email Already exists!"});
        }
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser= new UserModel({
            userName:req.body.userName,
            name:req.body.name,
            email: req.body.email,
            password: hash,
            contactNumber: req.body.contactNumber,
            role:req.body.role

        })
        await newUser.save();
         res.status(200).json({message:"User Registered Successfully!"});
    } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",data:error});
    } 
}

export const login= async (req, res) => {
    const userName= req.body.userName;
    try {
        const user = await UserModel.findOne({
            $or: [
              { userName: userName },
              { email: userName }
            ]
          });
        if(!user){
            return res.status(404).json({message: "User does not exist.!"});
        }
        const checkCorrectPass= await bcrypt.compare(req.body.password, user.password);
        if(!checkCorrectPass)
        {
            return res.status(404).json({message: "Password is Incorrect!"}); 
        }
        const {password, role, ...rest} = user._doc;

        const token= jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"15d"});
        
       /* res.cookie("accessToken", token,{
            httpOnly:true, 
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            sameSite: "None", 
            domain: "localhost"
        }).status(200).json({success:true, message:'successfully login.',token,role, data:{... rest}});*/
        res.status(200).json({success:true, message:'successfully login.', data:{token,role, ... rest}});
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to Login!",data:error});
    } 
}
