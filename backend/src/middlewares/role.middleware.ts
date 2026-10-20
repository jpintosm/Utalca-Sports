import {
  Response,
  NextFunction,
} from "express";

import {
  AuthRequest,
} from "./auth.middleware";


export const authorizeRoles =
  (...roles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {

    // El usuario debe haber pasado primero
    // por el middleware authenticate.
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });

      return;
    }


    // Verificamos que su rol esté autorizado.
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message:
          "No tiene permisos para realizar esta acción",
      });

      return;
    }


    next();
  };