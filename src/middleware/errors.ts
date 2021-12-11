import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/helpers/errors";

export const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (!error.statusCode) error.statusCode = 500;

  return res
    .status(error.statusCode)
    .json({ 
      status: "failed",
      error: error.toString(),
    });
}

export const logErrors = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(error.toString());
  next(error);
}