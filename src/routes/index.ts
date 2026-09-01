import { Router } from "express";
import { authRouter } from "./auth.js";
import { chatRouter } from "./chats.js";
import { documentsRouter } from "./documents.js";
import { queryRouter } from "./query.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/chats", chatRouter);
router.use("/documents", documentsRouter);
router.use("/query", queryRouter);

export { router };
