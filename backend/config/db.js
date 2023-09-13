import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database is connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
