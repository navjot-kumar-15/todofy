import jwt from "jsonwebtoken";
import User from "../model/auth.js";
import asyncHanlder from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const protect = asyncHanlder(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // getting the token from the headers
      token = req.headers.authorization.split(" ")[1];

      //   verify the token
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized !!!");
  }
});
