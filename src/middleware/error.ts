import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
console.error("ACTUAL ERROR:", err.message);
console.error(err.stack);

  res.status(500).json({
    success: false,
    data: null,
    error: "An error has occurred on the server",
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    data: null,
    error: {
       message: `Route ${req.method} ${req.path} not found`,
},
  });
};
