import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Request from "../models/request.model.js";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register =async (req, res) => {
    try {
        const {username,password,email} = req.body;
        if(!username || !password || !email){
            return res.status(400).json({error:"all fields are required"});
        }
        if (!emailRegex.test(email)){
            return res.status(400).json({error:"invalid email format"});
        }
        if(username.length < 3){
            return res.status(400).json({error:"name must be at least 3 characters"});
        }
        if(password.length < 6){
            return res.status(400).json({error:"password must be at least 6 characters"});
        }
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({error:"user already exists with that email"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser=new User({
            username,
            email,
            password:hashedPassword,

        })
        await newUser.save();
        if(newUser){
            return res.status(201).json({message:"user successfully registered",user:newUser});
        }

    }catch(err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}


export const login =async (req, res) => {
try {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).send({error:"both fields are required"});
    }

    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({error:"invalid email or password"});
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({error:"invalid email or password"});
    }
const token=jwt.sign(
    {userId:user._id},
    process.env.JWT_SECRET,
    {expiresIn: "1h"},
)
    res.cookie("token",token,{httpOnly:true});

    return res.status(200).json({message:"user successfully logged in",
        user:{
        userID:user._id,
            userName:user.username,
            email:user.email,
            role:user.role
        }});

}catch(err) {
    console.log(err);
    return res.status(500).json({error:err.message});
}
}


export const logout =async (req, res) => {
    try {
        res.clearCookie("token")

        return res.status(200).json({message:" logged out successfully"});
    }catch(err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}


export const fetchProfile =async (req, res) => {
    try {
        if(!req.user){
            return res.status(404).json({error:"please log in first"});
        }
        console.log(req.user)
        const user=await User.findById(req.user._id).select("-password")
        if(!user){
            return res.status(404).json({error:"user not found"});
        }

        return res.status(200).json({message:"user found",
            userId:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        });
    }catch(err) {
        console.log(err);
        return res.status(500).json({error:err.message});
    }
}