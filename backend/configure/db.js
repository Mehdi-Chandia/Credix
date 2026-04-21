import mongoose from "mongoose";
import dotenv from "dotenv";

export const dbConnection=async ()=>{
    dotenv.config();
    try {
        const URI=process.env.MONGODB_URI;
        await mongoose.connect(URI);

        console.log("Connected to MongoDB");
    }catch(err){
        console.error("failed to connect to db",err);
    }
}