import {BookModel} from '../models/BookSchema.js';

export const addBook = async (req, res) =>{
   try {
      const{name,author,availabilitystatus} =req.body;

      const user= await BookModel.findOne({name :name});
      if(user){
          return res.json({message: "Book Already exists!"});
      }
      const newbook= new BookModel({name, author,availabilitystatus});
      await newbook.save();
      res.status(200).json({message:"Book Added Successfully!"});
  } catch (error) {
   res.status(502).json({success:false,message:"Internal Server Error!",error});
  } 
 }
 
 export const getBook = async (req, res) =>{
   const id= req.params.id;
   try {
     const book =await BookModel.findById(id);
     if(book)
     res.
     status(200)
     .json({
       success:true,
       message: "Book Found",
       data: book
     });
     else
     res.status(404).json({success: false,message: "No Data Found!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const getAllBooks = async (req, res) =>{
   try {
    const books = await BookModel.find({});
    if(books.length>0)
    res.status(200).json({success:true,message:"Books Found!", data:books});
   else
   res.status(404).json({success:false,message:"No Data Found!"});
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const updateBook = async (req, res) =>{
   const id= req.params.id;
   try {
      const updateBook= await BookModel.findByIdAndUpdate(id, {$set:req.body},{new:true});
      if(updateBook)
       res.status(200).json({success:true,message:"Successfully Updated!",data:updateBook });
      else
      res.status(404).json({success:false,message:"Failed to Update!"});
         
   } catch (error) {
      res.status(502).json({success:false,message:"Internal Server Error!",error});
   } 
   
}

export const deleteBook = async (req, res) =>{
   const id= req.params.id;
   try {
       await BookModel.findByIdAndDelete(id);
       res.status(200).json({success:true,message:"Successfully Deleted!"});
    
   } catch (error) {
       res.status(500).json({success:false,message:"Failed to Delete!",error});
   } 
   
}

export const getAllBookNames =  async (req, res) =>{
   try {
      const books = await BookModel.find({ availabilitystatus: "Available" }, 'name');
      if(books.length>0)
        res.status(200).json({success:true,message:"Users Found!", data:books});
      else
       res.status(404).json({success:false,message:"Not Found!"});
     } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
     } 
}