import { Request, Response, NextFunction } from "express";
import HorarioService from "../services/horario.service";

class HorarioController {

  private readonly service: HorarioService;

  constructor() {
    this.service = new HorarioService();
  }

  getByEspacio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {
      const idEspacio = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const horarios =
        await this.service.getHorariosByEspacio(idEspacio);

      res.status(200).json(horarios);

    } catch (error) {
      next(error);
    }
  };


  getByEspacioAndFecha = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {
      const idEspacio = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const fecha = Array.isArray(req.query.fecha)
        ? req.query.fecha[0]
        : req.query.fecha;

      const horarios =
        await this.service.getHorariosByEspacioAndFecha(
          idEspacio,
          fecha as string
        );

      res.status(200).json(horarios);

    } catch (error) {
      next(error);
    }
  };
}

export default HorarioController;