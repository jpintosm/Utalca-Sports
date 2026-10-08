import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";

class AuthService {
  private userRepository = new UserRepository();

  async login(correo: string, contrasena: string) {
    const user = await this.userRepository.findByEmail(correo);

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    if (user.contrasena !== contrasena) {
      throw new Error("Credenciales inválidas");
    }

    if (user.estado !== "Activo") {
      throw new Error("Usuario inactivo");
    }

    const token = jwt.sign(
      {
        userId: user.id_usuario,
        role: user.rol,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return {
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
      },
    };
  }
}

export default AuthService;