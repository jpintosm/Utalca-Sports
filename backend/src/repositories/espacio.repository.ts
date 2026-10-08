import db from "../database/db";
import { EspacioDeportivo } from "../models/espacio";

class EspacioRepository {

  async findAll(): Promise<EspacioDeportivo[]> {
    const result = await db.query(`
      SELECT
        e.id_espacio,
        e.id_tipo,
        t.nombre AS tipo,
        e.nombre,
        e.ubicacion,
        e.descripcion,
        e.precio::float8 AS precio,
        e.estado
      FROM espacio_deportivo e
      JOIN tipo_espacio t
        ON e.id_tipo = t.id_tipo
      ORDER BY e.id_espacio
    `);

    return result.rows;
  }

  async findById(
    id: string | number
  ): Promise<EspacioDeportivo | undefined> {

    const result = await db.query(
      `
      SELECT
        e.id_espacio,
        e.id_tipo,
        t.nombre AS tipo,
        e.nombre,
        e.ubicacion,
        e.descripcion,
        e.precio::float8 AS precio,
        e.estado
      FROM espacio_deportivo e
      JOIN tipo_espacio t
        ON e.id_tipo = t.id_tipo
      WHERE e.id_espacio = $1
      `,
      [id]
    );

    return result.rows[0];
  }
}

export default EspacioRepository;