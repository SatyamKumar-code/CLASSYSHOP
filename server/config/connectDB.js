import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


if(!process.env.MONGO_URI){
    throw new Error(
        "Please porvide MONGO_URI in your .env file"
    )
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;