import HorarioRepository from "../repositories/horario.repository";
import EspacioRepository from "../repositories/espacio.repository";
import { ValidationError, NotFoundError } from "../errors";

class HorarioService {

  private readonly horarioRepository: HorarioRepository;
  private readonly espacioRepository: EspacioRepository;

  constructor() {
    this.horarioRepository = new HorarioRepository();
    this.espacioRepository = new EspacioRepository();
  }

  async getHorariosByEspacio(idEspacio: string) {

    if (!idEspacio) {
      throw new ValidationError("El id del espacio es requerido");
    }

    const espacio = await this.espacioRepository.findById(idEspacio);

    if (!espacio) {
      throw new NotFoundError("Espacio deportivo no encontrado");
    }

    return await this.horarioRepository.findByEspacio(idEspacio);
  }

  async getHorariosByEspacioAndFecha(
    idEspacio: string,
    fecha: string
  ) {

    if (!idEspacio) {
      throw new ValidationError("El id del espacio es requerido");
    }

    if (!fecha) {
      throw new ValidationError("La fecha es requerida");
    }

    const espacio = await this.espacioRepository.findById(idEspacio);

    if (!espacio) {
      throw new NotFoundError("Espacio deportivo no encontrado");
    }

    return await this.horarioRepository.findByEspacioAndFecha(
      idEspacio,
      fecha
    );
  }
}

export default HorarioService;