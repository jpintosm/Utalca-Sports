import UsuarioRepository from "../repositories/user.repository";
import { ValidationError, NotFoundError } from "../errors";

class UsuarioService {
  private readonly repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async getUsuarios() {
    const usuarios =
      await this.repository.findAll();

    // Nunca devolvemos la contraseña.
    return usuarios.map(
      ({ contrasena, ...usuario }) => usuario
    );
  }

  async getUsuario(idUsuario: string) {
    if (!idUsuario) {
      throw new ValidationError(
        "El id del usuario es requerido"
      );
    }

    const usuario =
      await this.repository.findById(
        idUsuario
      );

    if (!usuario) {
      throw new NotFoundError(
        "Usuario no encontrado"
      );
    }

    // Quitamos la contraseña antes de devolverlo.
    const {
      contrasena,
      ...usuarioSeguro
    } = usuario;

    return usuarioSeguro;
  }
}

export default UsuarioService;