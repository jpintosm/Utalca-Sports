import db from "../database/db";
import {
  Horario,
  DisponibilidadHorario,
} from "../models/horario";

class HorarioRepository {

  async findByEspacio(
    idEspacio: string | number
  ): Promise<Horario[]> {

    const result = await db.query(
      `
      SELECT
        id_horario,
        id_espacio,
        fecha,
        hora_inicio,
        hora_fin,
        estado
      FROM horario
      WHERE id_espacio = $1
      ORDER BY fecha, hora_inicio
      `,
      [idEspacio]
    );

    return result.rows;
  }


  async findByEspacioAndFecha(
    idEspacio: string | number,
    fecha: string
  ): Promise<DisponibilidadHorario[]> {

    const result = await db.query(
      `
      SELECT
        h.id_horario,
        h.id_espacio,
        h.fecha,
        h.hora_inicio,
        h.hora_fin,
        h.estado,

        CASE
          WHEN h.estado <> 'Habilitado' THEN false

          WHEN EXISTS (
            SELECT 1
            FROM reserva r
            WHERE r.id_horario = h.id_horario
              AND r.estado = 'Activa'
          ) THEN false

          WHEN EXISTS (
            SELECT 1
            FROM bloqueo b
            WHERE b.id_horario = h.id_horario
          ) THEN false

          ELSE true
        END AS disponible,

        CASE
          WHEN h.estado <> 'Habilitado'
            THEN 'Deshabilitado'

          WHEN EXISTS (
            SELECT 1
            FROM reserva r
            WHERE r.id_horario = h.id_horario
              AND r.estado = 'Activa'
          )
            THEN 'Reservado'

          WHEN EXISTS (
            SELECT 1
            FROM bloqueo b
            WHERE b.id_horario = h.id_horario
          )
            THEN 'Bloqueado'

          ELSE 'Disponible'
        END AS disponibilidad

      FROM horario h

      WHERE h.id_espacio = $1
        AND h.fecha = $2

      ORDER BY h.hora_inicio
      `,
      [idEspacio, fecha]
    );

    return result.rows;
  }
}

export default HorarioRepository;