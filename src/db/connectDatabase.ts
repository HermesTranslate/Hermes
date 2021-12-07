import * as mongoDB from "mongodb";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

export async function connectDatabase () {
    mongoose.connect(process.env.MONGO_URI!)
    console.log(`Successfully connected to database`);
}