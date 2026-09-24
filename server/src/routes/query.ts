import { Router } from "express";

import { runQuery } from "../controllers/query.js";
import { auth } from "../middleware/auth.js";

const queryRouter = Router();

queryRouter.use(auth);

queryRouter.post("/", runQuery);

export { queryRouter };