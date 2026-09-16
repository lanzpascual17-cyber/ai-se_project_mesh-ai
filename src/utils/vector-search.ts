type VectorItem = {
  id: string;
  documentId: string;
  text: string;
  embedding: number[];
};

const dotProduct = (a: number[], b: number[]): number => {
  return a.reduce(
    (sum, value, index) => sum + value * b[index]!,
    0
  );
};

const magnitude = (vector: number[]): number => {
  return Math.sqrt(
    vector.reduce((sum, value) => sum + value * value, 0)
  );
};

const cosineSimilarity = (
  a: number[],
  b: number[]
): number => {
  const denominator = magnitude(a) * magnitude(b);

  if (denominator === 0) {
    return 0;
  }

  return dotProduct(a, b) / denominator;
};

export const rankBySimilarity = (
  queryEmbedding: number[],
  items: VectorItem[],
  limit = 5
): VectorItem[] => {
  return items
    .map((item) => ({
      ...item,
      similarity: cosineSimilarity(
        queryEmbedding,
        item.embedding
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
};