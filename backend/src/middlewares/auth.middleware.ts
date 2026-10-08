import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token es requerido",
    });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload as any;
    next();
  } catch {
    return res.status(401).json({
      message: "Token es invalido",
    });
  }
};
