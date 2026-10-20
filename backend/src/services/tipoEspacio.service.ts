import TipoEspacioRepository from "../repositories/tipoEspacio.repository";
import { ValidationError, NotFoundError } from "../errors";

class TipoEspacioService {
  private readonly repository: TipoEspacioRepository;

  constructor() {
    this.repository = new TipoEspacioRepository();
  }

  async getTiposEspacio() {
    return await this.repository.findAll();
  }

  async getTipoEspacio(idTipo: string) {
    if (!idTipo) {
      throw new ValidationError(
        "El id del tipo de espacio es requerido"
      );
    }

    const tipo =
      await this.repository.findById(idTipo);

    if (!tipo) {
      throw new NotFoundError(
        "Tipo de espacio no encontrado"
      );
    }

    return tipo;
  }
}

export default TipoEspacioService;