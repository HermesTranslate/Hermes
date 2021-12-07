import * as mongoDB from "mongodb";
import mongoose from 'mongoose';

export async function connectDatabase () {
    mongoose.connect(process.env.MONGO_URI!)
    console.log(`Successfully connected to database`);
}