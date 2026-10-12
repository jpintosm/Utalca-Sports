import db from "../database/db";
import {
  Reserva,
  ReservaDetalle,
} from "../models/reserva";

class ReservaRepository {

  async findById(
    idReserva: string | number
  ): Promise<Reserva | undefined> {

    const result = await db.query(
      `
      SELECT
        id_reserva,
        id_usuario,
        id_horario,
        estado,
        fecha_creacion::text AS fecha_creacion
      FROM reserva
      WHERE id_reserva = $1
      `,
      [idReserva]
    );

    return result.rows[0];
  }


  async findActivaByHorario(
    idHorario: string | number
  ): Promise<Reserva | undefined> {

    const result = await db.query(
      `
      SELECT
        id_reserva,
        id_usuario,
        id_horario,
        estado,
        fecha_creacion::text AS fecha_creacion
      FROM reserva
      WHERE id_horario = $1
        AND estado = 'Activa'
      LIMIT 1
      `,
      [idHorario]
    );

    return result.rows[0];
  }


  async findByUsuario(
    idUsuario: string | number
  ): Promise<ReservaDetalle[]> {

    const result = await db.query(
      `
      SELECT
        r.id_reserva,
        r.id_usuario,
        r.id_horario,
        r.estado,
        r.fecha_creacion::text AS fecha_creacion,

        e.nombre AS nombre_espacio,
        e.ubicacion,

        h.fecha::text AS fecha,
        h.hora_inicio::text AS hora_inicio,
        h.hora_fin::text AS hora_fin

      FROM reserva r

      JOIN horario h
        ON r.id_horario = h.id_horario

      JOIN espacio_deportivo e
        ON h.id_espacio = e.id_espacio

      WHERE r.id_usuario = $1

      ORDER BY h.fecha, h.hora_inicio
      `,
      [idUsuario]
    );

    return result.rows;
  }


  async create(
    idUsuario: number,
    idHorario: number
  ): Promise<Reserva> {

    const result = await db.query(
      `
      INSERT INTO reserva (
        id_usuario,
        id_horario,
        estado,
        fecha_creacion
      )
      VALUES (
        $1,
        $2,
        'Activa',
        CURRENT_TIMESTAMP
      )

      RETURNING
        id_reserva,
        id_usuario,
        id_horario,
        estado,
        fecha_creacion::text AS fecha_creacion
      `,
      [idUsuario, idHorario]
    );

    return result.rows[0];
  }


  async cancel(
    idReserva: string | number,
    idUsuario: string | number
  ): Promise<Reserva | undefined> {

    const result = await db.query(
      `
      UPDATE reserva
      SET estado = 'Cancelada'

      WHERE id_reserva = $1
        AND id_usuario = $2
        AND estado = 'Activa'

      RETURNING
        id_reserva,
        id_usuario,
        id_horario,
        estado,
        fecha_creacion::text AS fecha_creacion
      `,
      [idReserva, idUsuario]
    );

    return result.rows[0];
  }
}

export default ReservaRepository;