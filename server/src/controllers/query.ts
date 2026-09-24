import type { Request, Response } from "express";
import { Document } from "../models/documents.js";
import { Chunk } from "../models/chunk.js";
import { createEmbedding } from "../utils/embeddings.js";
import { rankBySimilarity } from "../utils/vector-search.js";
import {
  getClient,
  LLM_MODEL,
  buildContext,
} from "../utils/openai-client.js";

export const runQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question } = req.body;
  const userId = req.user!.userId;

  if (!question) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: "Question is required" },
    });
    return;
  }

  const userDocs = await Document.find({ userId }, "_id");
  const docIds = userDocs.map((document) => document._id);

  const chunkRecords = await Chunk.find({
    documentId: { $in: docIds },
  });

  const chunks = chunkRecords.map((chunk) => ({
    id: String(chunk._id),
    documentId: String(chunk.documentId),
    text: chunk.text,
    embedding: chunk.embedding,
  }));

  const queryEmbedding = await createEmbedding(question);

  const rankedChunks = rankBySimilarity(
    queryEmbedding,
    chunks,
    5
  );

  const context = buildContext(rankedChunks);

  const client = getClient();

  const completion = await client.chat.completions.create({
    model: LLM_MODEL,
    messages: [
      {
        role: "system",
        content:
          "Answer the user's question using the provided context.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  const answer =
    completion.choices[0]?.message?.content ?? "";

  res.status(200).json({
    success: true,
    data: {
      question,
      answer,
      chunks: rankedChunks,
    },
    error: null,
  });
};