import type { Request, Response } from "express";

import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Title is required" },
    });
    return;
  }

  const chat = await Chat.create({
    title,
    userId: req.user!.userId,
  });

  res.status(201).json({
    success: true,
    data: chat,
    error: null,
  });
};

export const getChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const chats = await Chat.find({
    userId: req.user!.userId,
  });

  res.status(200).json({
    success: true,
    data: chats,
    error: null,
  });
};

export const getChatById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.userId;
  const chatId = req.params.id!;

  const chat = await Chat.findOne({
    _id: chatId,
    userId,
  });

  if (!chat) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: "Chat not found" },
    });
    return;
  }

  const messages = await Message.find({
    chatId: chat._id,
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    data: {
      chat,
      messages,
    },
    error: null,
  });
};

export const deleteChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.userId;
  const chatId = req.params.id!;

  const chat = await Chat.findOneAndDelete({
    _id: chatId,
    userId,
  });

  if (!chat) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: "Chat not found" },
    });
    return;
  }

  await Message.deleteMany({
    chatId: chat._id,
  });

  res.status(204).send();
};