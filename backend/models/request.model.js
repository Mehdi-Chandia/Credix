import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fullName:{
        type:String,
        required:true,
    },
    licenseNumber:{
        type:String,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    documents:[
        {
            fileUrl:String,
            fileName:String,
        }
    ],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    reviewNote:{
        type:String,
    },
    licenseExpiryDate: {
        type: Date
    }


},{timestamps:true});
const Request = mongoose.model("Request",requestSchema);
export default Request;





