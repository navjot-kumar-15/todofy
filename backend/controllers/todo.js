import Todo from "../model/todo.js";
import asyncHander from "express-async-handler";

// Create a todo
export const createTodo = asyncHander(async (req, res) => {
  const todo = await Todo(req.body);

  if (!todo) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const saveTodo = new Todo({
    user: req.user.id,
    text: req.body,
  });
  await saveTodo.save();
  res.status(200).json(saveTodo);
});

// Get all todo
export const getAllTodo = asyncHander(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id });
  res.status(200).json(todo);
});

// Update the todo
export const updateTodo = asyncHander(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("todo is not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

// Delete the todo
export const deleteTodo = asyncHander(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  await todo.deleteOne();
  res.status(200).json({ id: req.params.id });
});
