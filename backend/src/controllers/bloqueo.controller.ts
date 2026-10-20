import {
  Request,
  Response,
  NextFunction,
} from "express";

import BloqueoService from "../services/bloqueo.service";


class BloqueoController {

  private readonly service: BloqueoService;


  constructor() {
    this.service = new BloqueoService();
  }


  // =====================================
  // OBTENER BLOQUEO POR ID
  // =====================================

  getBloqueo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const idBloqueo =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;


      const bloqueo =
        await this.service.getBloqueo(
          idBloqueo
        );


      res.status(200).json(bloqueo);

    } catch (error) {

      next(error);

    }
  };


  // =====================================
  // CREAR BLOQUEO
  // =====================================

  createBloqueo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const idHorario =
        Number(req.body.id_horario);

      const motivo =
        req.body.motivo;

      const descripcion =
        req.body.descripcion ?? null;


      const bloqueo =
        await this.service.createBloqueo(
          idHorario,
          motivo,
          descripcion
        );


      res.status(201).json(bloqueo);

    } catch (error) {

      next(error);

    }
  };


  // =====================================
  // ELIMINAR BLOQUEO
  // =====================================

  removeBloqueo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const idBloqueo =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;


      const bloqueo =
        await this.service.removeBloqueo(
          idBloqueo
        );


      res.status(200).json(bloqueo);

    } catch (error) {

      next(error);

    }
  };
}


export default BloqueoController;