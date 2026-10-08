import { Request, Response, NextFunction } from "express";
import EspacioService from "../services/espacio.service";

class EspacioController {

  private readonly service: EspacioService;

  constructor() {
    this.service = new EspacioService();
  }

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {
      const espacios = await this.service.getEspacios();

      res.status(200).json(espacios);

    } catch (error) {
      next(error);
    }
  };


  getEspacio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const espacio = await this.service.getEspacio(id);

      res.status(200).json(espacio);

    } catch (error) {
      next(error);
    }
  };
}

export default EspacioController;