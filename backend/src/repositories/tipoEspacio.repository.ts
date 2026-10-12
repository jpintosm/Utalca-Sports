import db from "../database/db";
import { TipoEspacio } from "../models/tipoEspacio";

class TipoEspacioRepository {

  async findAll(): Promise<TipoEspacio[]> {

    const result = await db.query(`
      SELECT
        id_tipo,
        nombre
      FROM tipo_espacio
      ORDER BY id_tipo
    `);

    return result.rows;
  }


  async findById(
    idTipo: string | number
  ): Promise<TipoEspacio | undefined> {

    const result = await db.query(
      `
      SELECT
        id_tipo,
        nombre
      FROM tipo_espacio
      WHERE id_tipo = $1
      `,
      [idTipo]
    );

    return result.rows[0];
  }


  async findByNombre(
    nombre: string
  ): Promise<TipoEspacio | undefined> {

    const result = await db.query(
      `
      SELECT
        id_tipo,
        nombre
      FROM tipo_espacio
      WHERE nombre = $1
      `,
      [nombre]
    );

    return result.rows[0];
  }
}

export default TipoEspacioRepository;