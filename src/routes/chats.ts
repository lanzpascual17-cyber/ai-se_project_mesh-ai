import { Router } from "express";
import {
  createChat,
  getChats,
  getChatById,
  sendMessage,
  deleteChat,
} from "../controllers/chats.js";

const chatRouter = Router();

chatRouter.post("/", createChat);
chatRouter.get("/", getChats);
chatRouter.get("/:id", getChatById);
chatRouter.post("/:id/messages", sendMessage);
chatRouter.delete("/:id", deleteChat);

export { chatRouter };
