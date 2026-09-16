import type { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
return res.status(401).json({
  success: false,
  data: null,
  error: { message: "Unauthorized" },
});
}

const token = authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({
    success: false,
    data: null,
    error: { message: "Unauthorized" },
  });
}

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as { userId: string };

  req.user = decoded;
  next();
} catch {
  res.status(401).json({
    success: false,
    data: null,
    error: { message: "Unauthorized" },
  });
}
};
