import RolRepository from "../repositories/rol.repository";
import { ValidationError, NotFoundError } from "../errors";

class RolService {
  private readonly repository: RolRepository;

  constructor() {
    this.repository = new RolRepository();
  }

  async getRoles() {
    return await this.repository.findAll();
  }

  async getRol(idRol: string) {
    if (!idRol) {
      throw new ValidationError(
        "El id del rol es requerido"
      );
    }

    const rol =
      await this.repository.findById(idRol);

    if (!rol) {
      throw new NotFoundError(
        "Rol no encontrado"
      );
    }

    return rol;
  }
}

export default RolService;