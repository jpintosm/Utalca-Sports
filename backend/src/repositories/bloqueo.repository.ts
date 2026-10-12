import db from "../database/db";
import { Bloqueo } from "../models/bloqueo";

class BloqueoRepository {

  async findById(
    idBloqueo: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await db.query(
      `
      SELECT
        id_bloqueo,
        id_horario,
        motivo,
        descripcion,
        fecha_creacion::text AS fecha_creacion
      FROM bloqueo
      WHERE id_bloqueo = $1
      `,
      [idBloqueo]
    );

    return result.rows[0];
  }


  async findByHorario(
    idHorario: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await db.query(
      `
      SELECT
        id_bloqueo,
        id_horario,
        motivo,
        descripcion,
        fecha_creacion::text AS fecha_creacion
      FROM bloqueo
      WHERE id_horario = $1
      LIMIT 1
      `,
      [idHorario]
    );

    return result.rows[0];
  }


  async create(
    idHorario: number,
    motivo: string,
    descripcion: string | null
  ): Promise<Bloqueo> {

    const result = await db.query(
      `
      INSERT INTO bloqueo (
        id_horario,
        motivo,
        descripcion,
        fecha_creacion
      )
      VALUES (
        $1,
        $2,
        $3,
        CURRENT_TIMESTAMP
      )

      RETURNING
        id_bloqueo,
        id_horario,
        motivo,
        descripcion,
        fecha_creacion::text AS fecha_creacion
      `,
      [
        idHorario,
        motivo,
        descripcion,
      ]
    );

    return result.rows[0];
  }


  async remove(
    idBloqueo: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await db.query(
      `
      DELETE FROM bloqueo
      WHERE id_bloqueo = $1

      RETURNING
        id_bloqueo,
        id_horario,
        motivo,
        descripcion,
        fecha_creacion::text AS fecha_creacion
      `,
      [idBloqueo]
    );

    return result.rows[0];
  }
}

export default BloqueoRepository;