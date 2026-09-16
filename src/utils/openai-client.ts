import OpenAI from "openai";

export const LLM_MODEL = "Qwen/Qwen3-30B-A3B-Instruct-2507";

let client: OpenAI;

export const getClient = (): OpenAI => {
  if (!client) {
    client = new OpenAI({
      baseURL: "https://api.tokenfactory.nebius.com/v1/",
      apiKey: process.env.NEBIUS_API_KEY!,
    });
  }

  return client;
};

export const buildContext = (
  chunks: { text: string }[]
): string => {
  if (chunks.length === 0) {
    return "No relevant context found.";
  }

  return chunks
    .map((chunk, index) => `Chunk ${index + 1}: ${chunk.text}`)
    .join("\n\n");
};