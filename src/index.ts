import express from "express";
import { router } from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use(logger);
const port = 3000;

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/test-error", () => {
  throw new Error("Test error");
});

app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port 3000");
});
