import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
  loginUser,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/me", getCurrentUser);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export { authRouter };
