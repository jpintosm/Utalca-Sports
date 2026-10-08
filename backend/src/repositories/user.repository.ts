import db from "../database/db";

class UserRepository {
  async findByEmail(correo: string) {
    const result = await db.query(
      `
      SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.contrasena,
        u.estado,
        r.nombre AS rol
      FROM usuario u
      JOIN rol r ON u.id_rol = r.id_rol
      WHERE u.correo = $1
      `,
      [correo]
    );

    return result.rows[0];
  }
}

export default UserRepository;