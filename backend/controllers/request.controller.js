import {uploadToCloudinary} from "../configure/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";
import Request from "../models/request.model.js";



export const createRequest=async (req,res)=>{
try {
    const {fullName,specialization,licenseNumber,experience}=req.body;
    if(!fullName || !specialization || !licenseNumber || !experience){
        return res.status(401).json({message:"missing required fields"});
    }
    const files=req.files;
    if(!files || files.length == 0){
        return res.status(401).json({message:"missing required documents"});
    }
    const uploadedDocs=[];

    for (let file of files) {
        const result=await uploadToCloudinary(file.path)
console.log(result.secure_url)
        console.log(file.path)
        uploadedDocs.push({
            fileUrl:result.secure_url,
            fileName:result.original_filename
        })
        fs.unlinkSync(file.path);
    }

    console.log(req.user)

    const newRequest=new Request({
        userId:req?.user?.id,
        fullName,
        specialization,
        licenseNumber,
        experience,
        documents: uploadedDocs,
        status:"pending",
        createdAt: new Date().toISOString(),
    })
    await newRequest.save();

    if (newRequest){
        return res.status(200).json({message:"request submitted successfully",requestData:newRequest});
       }

    }catch(err){
    return res.status(500).json({message:err.message});
  }

}

export const myRequests=async (req,res)=>{
    try {
        const id=req?.user?.id;
        if(!id){
            return res.status(404).json({message:"user id not found"});
        }
        const myReqs=await Request.find({userId:id}).sort({"createdAt":-1})
        if(!myReqs){
            return res.status(404).json({message:"no requests found"})
        }
        return res.status(200).json({message:"your requests found",Reqs:myReqs});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const allRequests=async (req,res)=>{
    try {
        const requests=await Request.find().sort({"createdat":-1})

        if(!requests){
            return res.status(404).json({message:"no requests found"});
        }
        return res.status(200).json({message: "request found", Requests: requests});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const updateStatus =async (req, res) => {
    try {
        const{id}=req.params;
        const{status,licenseExpiryDate,reviewNote}=req.body;

        console.log(id)

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"invalid id"});
        }

        const update=await Request.findByIdAndUpdate(id,
            {
                status:status,
                licenseExpiryDate:licenseExpiryDate,
                reviewNote:reviewNote
            },
            {new:true})
        console.log(update)

        if(!update){
            return res.status(404).json({message:"no request found"});
        }

        return res.status(200).json({message:"status successfully updated"});
    }catch(err) {
        console.log(err);
        return res.status(400).json({message:err.message});
    }
}

export const singleRequest=async (req,res)=>{
    try {
        const {id}=req.params;

        console.log(id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"invalid id"});
        }
        const Req=await Request.findById(id)
        if(!Req){
            return res.status(404).json({message:"no request foundv with given id"});
        }
        return res.status(200).json({message:"request found",Request:Req});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}