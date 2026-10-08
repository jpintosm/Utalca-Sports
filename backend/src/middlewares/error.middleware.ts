import { Request, Response, NextFunction } from "express";
import { ValidationError, NotFoundError } from "../errors";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ValidationError) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }
  if (error instanceof NotFoundError) {
    res.status(404).json({
      message: error.message,
    });
    return;
  }
  res.status(500).json({
    message: "Error interno del servidor",
    error: error,
  });
  console.error(error);
}


