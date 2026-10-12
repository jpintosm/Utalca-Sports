import db from "../database/db";
import { UsuarioConRol } from "../models/user";

class UsuarioRepository {

  async findByEmail(
    correo: string
  ): Promise<UsuarioConRol | undefined> {

    const result = await db.query(
      `
      SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.contrasena,
        u.id_rol,
        u.estado,
        r.nombre AS rol
      FROM usuario u
      JOIN rol r
        ON u.id_rol = r.id_rol
      WHERE u.correo = $1
      `,
      [correo]
    );

    return result.rows[0];
  }


  async findById(
    idUsuario: string | number
  ): Promise<UsuarioConRol | undefined> {

    const result = await db.query(
      `
      SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.contrasena,
        u.id_rol,
        u.estado,
        r.nombre AS rol
      FROM usuario u
      JOIN rol r
        ON u.id_rol = r.id_rol
      WHERE u.id_usuario = $1
      `,
      [idUsuario]
    );

    return result.rows[0];
  }


  async findAll(): Promise<UsuarioConRol[]> {

    const result = await db.query(`
      SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.contrasena,
        u.id_rol,
        u.estado,
        r.nombre AS rol
      FROM usuario u
      JOIN rol r
        ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario
    `);

    return result.rows;
  }
}

export default UsuarioRepository;