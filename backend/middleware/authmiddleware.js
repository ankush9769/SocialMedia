import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export const protect = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({msg:"Please login to access this resource"});
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.id;
        next()
    }
    catch(err){
        console.log("err",err)
        return res.status(401).json({msg:"Invalid token"})
    }
}