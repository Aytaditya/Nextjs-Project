import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    // const connection=mongoose.connection;

    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}