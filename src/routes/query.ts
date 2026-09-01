import { Router } from "express";
import { runQuery } from "../controllers/query.js";

const queryRouter = Router();

queryRouter.post("/", runQuery);

export { queryRouter };
