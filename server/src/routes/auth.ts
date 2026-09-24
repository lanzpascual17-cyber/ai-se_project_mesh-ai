import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
  loginUser,
} from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const authRouter = Router();

authRouter.get("/me", auth, getCurrentUser);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export { authRouter };
