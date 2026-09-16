import { Router } from "express";
import multer from "multer";

import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
} from "../controllers/documents.js";

import { auth } from "../middleware/auth.js";

const documentsRouter = Router();

documentsRouter.use(auth);

const upload = multer({ dest: "uploads/" });

documentsRouter.post("/", upload.single("file"), uploadDocument);
documentsRouter.get("/", getDocuments);
documentsRouter.get("/:id", getDocumentById);
documentsRouter.delete("/:id", deleteDocument);

export { documentsRouter };