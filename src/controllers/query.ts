import type { Request, Response } from "express";

export const runQuery = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};
