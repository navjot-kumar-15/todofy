import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";
import { connectDB } from "./config/db.js";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();

// Routes
app.use("/todo/v1", todoRouter);
app.use("/todo/v1/auth", authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT} `);
});
