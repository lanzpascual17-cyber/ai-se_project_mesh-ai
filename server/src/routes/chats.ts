import { Router } from "express";

import {
  createChat,
  getChats,
  getChatById,
  deleteChat,
} from "../controllers/chats.js";

import { createMessage } from "../controllers/messages.js";
import { auth } from "../middleware/auth.js";

const chatRouter = Router();

chatRouter.use(auth);

chatRouter.post("/", createChat);
chatRouter.get("/", getChats);
chatRouter.get("/:id", getChatById);
chatRouter.delete("/:id", deleteChat);
chatRouter.post("/:id/messages", createMessage);

export { chatRouter };