import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Authroute from './routers/AuthRoute.js'
import userroute from './routers/userroutes.js'
import bookroute from './routers/book.js'
import transactionroute from './routers/transaction.js'

dotenv.config();

const app=express();
const port= process.env.PORT || 6000
const db=process.env.MONGODB
const base=process.env.URL


mongoose.set("strictQuery", false)

const connectDB= async() =>{
try {
    await mongoose.connect(process.env.MONGODB)
    console.log("DB connected successfully!")
    
} catch (error) {
    console.log("DB connection Failed!")
    
}
}

app.use(express.json());
app.use(cors());

app.use(base+'auth',Authroute)
app.use(base+'user',userroute)
app.use(base+'book',bookroute)
app.use(base+'transaction',transactionroute)


app.listen(port,()=>{
    connectDB();
    console.log("Server Started");
})

app.get("/",(req,res)=>{
    res.send("API is working");
})