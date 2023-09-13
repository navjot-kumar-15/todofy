import express from "express";
import { loginUser, registerUser, singleUser } from "../controllers/auth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", singleUser);

export default router;
