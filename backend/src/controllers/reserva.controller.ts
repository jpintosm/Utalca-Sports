import { Response, NextFunction } from "express";
import ReservaService from "../services/reserva.service";
import { AuthRequest } from "../middlewares/auth.middleware";

class ReservaController {
  private readonly service: ReservaService;

  constructor() {
    this.service = new ReservaService();
  }

  // =====================================
  // OBTENER MIS RESERVAS
  // =====================================

  getMisReservas = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idUsuario = req.user!.userId;

      const reservas =
        await this.service.getReservasByUsuario(
          idUsuario
        );

      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  };

  // =====================================
  // OBTENER UNA RESERVA POR ID
  // =====================================

  getReserva = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idReserva = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const idUsuario = req.user!.userId;

      const reserva =
        await this.service.getReserva(
          idReserva,
          idUsuario
        );

      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  };

  // =====================================
  // CREAR RESERVA
  // =====================================

  createReserva = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idUsuario = req.user!.userId;

      const idHorario = Number(
        req.body.id_horario
      );

      const reserva =
        await this.service.createReserva(
          idUsuario,
          idHorario
        );

      res.status(201).json(reserva);
    } catch (error) {
      next(error);
    }
  };

  // =====================================
  // CANCELAR RESERVA
  // =====================================

  cancelReserva = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const idReserva = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const idUsuario = req.user!.userId;

      const reserva =
        await this.service.cancelReserva(
          idReserva,
          idUsuario
        );

      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  };
}

export default ReservaController;