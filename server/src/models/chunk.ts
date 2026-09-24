import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Chunk = mongoose.model("Chunk", chunkSchema);