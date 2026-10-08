import EspacioRepository from "../repositories/espacio.repository";
import { ValidationError, NotFoundError } from "../errors";

class EspacioService {

  private readonly repository: EspacioRepository;

  constructor() {
    this.repository = new EspacioRepository();
  }

  async getEspacios() {
    return await this.repository.findAll();
  }

  async getEspacio(id: string) {

    if (!id) {
      throw new ValidationError("El id es requerido");
    }

    const espacio = await this.repository.findById(id);

    if (!espacio) {
      throw new NotFoundError("Espacio deportivo no encontrado");
    }

    return espacio;
  }
}

export default EspacioService;