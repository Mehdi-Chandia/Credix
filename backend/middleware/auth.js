import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const verifyToken =async (req, res, next) => {
    try {
        const token=req.cookies.token;
        if (!token) {
            return res.status(401).json({message:"user is not logged in"});
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        const user=await User.findById(decoded.userId)

        if(!user){
           return res.status(404).json({message:"No user found with provided token"});
        }
        req.user = user;
        next();
    }catch(err) {
        console.log(err)
        return res.status(401).json({message:"user is not authorized"})
    }
}


export const isAdmin =(req,res,next)=>{
    if (req.user.role !== "admin"){
        return res.status(403).json({message:"access denied admin only"});
    }
    next();

}

