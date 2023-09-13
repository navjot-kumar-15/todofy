import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todo.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", protect, createTodo);
router.get("/", protect, getAllTodo);
router.put("/:id", protect, updateTodo);
router.patch("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

export default router;
