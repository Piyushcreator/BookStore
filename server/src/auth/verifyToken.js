
import jwt from 'jsonwebtoken'

export const verifyToken =(req,res,next)=>{
  
    try {
        //console.log(req.cookies);
       //const token= req.cookies.accessToken; // for cookies
       
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false, message: "You are not authorized."})
        }

    
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(401).json({success:false, message:"token is invalid",err,user})
            }
            req.user =user
            next();
        })
    } catch (error) {
        return res.status(500).json({success:false, message:"token is invalid, Server Error",data:error})
    }

   
}

export const verifyUser=(req,res,next)=>{
    try{
    verifyToken(req,res, next,()=>{
        if(req.user.id===req.params.id || req.user.role==='admin'){
            next();
        }
        else{
            res.status(401).json({success:false,message:"You are not authenticated."})
        }
    })

} catch (error) {
    return res.status(500).json({success:false, message:"token is invalid",data:error})
}


}


export const verifyAdmin=(req,res,next)=>{
    try{
    verifyToken(req,res, next,()=>{
        if(req.user.role==='admin'){
            next();
        }
        else{
            res.status(401).json({success:false,message:"You are not authorized."})
        }
    })
} catch (error) {
    return res.status(500).json({success:false, message:"token is invalid",data:error})
}

}