import type { Request, Response } from "express";
import { User }  from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId);
  if (!user) {
  return res.status(404).json({
    success: false,
    data: null,
    error: { message: "User not found" },
  });
}
  res.status(200).json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    error: null,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const {email, password, name} = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({
  success: false,
  data: null,
  error: { message: "Email, password, and name are required" },
});
}
if (password.length < 8) {
  return res.status(400).json({
    success: false,
    data: null,
    error: { message: "Password must be at least 8 characters"},
  })
}
const existingUser = await User.findOne({
  email: email,
});
if (existingUser) {
  return res.status(409).json({
    success: false,
    data: null,
    error: { message: "Email is already in use" },
  });
}
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });
  res.status(201).json({
    success: true,
    data: {
      userId: user._id,
      email: email,
      name: name,
    },
    error: null,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      error: { message: "Email and password are required"},
    });
  }
  const user = await User.findOne({
    email: email,
  })
  if (!user) {
    return res.status(401).json({
      success: false,
      data: null,
      error: { message: "Invalid email or password" }
    })
  }
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({
      success: false,
      data: null,
      error: {message: "Invalid email or password"},
    });
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!
  );
  res.status(200).json({
    success: true,
data: {
  user: {
    userId: user._id,
    name: user.name,
    email: user.email,
  },
  token: token,
},
    error: null,
  });
};
