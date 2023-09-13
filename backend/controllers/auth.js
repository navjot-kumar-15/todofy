import User from "../model/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Create a new User
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //   to check the user already exit or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Please enter the valid credentials");
  }

  //   hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //   create a new user
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credetials");
  }
});

// authenticate the user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find the user
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.username,
      email: user.email,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credetials");
  }
  res.status(200).json({ message: "Login user successfully" });
});

// get single user
export const singleUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.status(200).json(req.user);
});

// genrate token
const genrateToken = (id) => {
  const jwtToken = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return jwtToken;
};
