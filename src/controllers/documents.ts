import type { Request, Response } from "express";

export const createDocument = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};

export const getDocuments = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

export const getDocumentById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

export const deleteDocument = (req: Request, res: Response): void => {
  res.status(204).send();
};
