import {
  and,
  eq,
  sql,
} from "drizzle-orm";

import { drizzleDb } from "../database/db";

import {
  reserva,
  horario,
  espacioDeportivo,
} from "../database/schema";

import {
  Reserva,
  ReservaDetalle,
} from "../models/reserva";


class ReservaRepository {

  // =====================================
  // BUSCAR RESERVA POR ID
  // =====================================

  async findById(
    idReserva: string | number
  ): Promise<Reserva | undefined> {

    const result = await drizzleDb
      .select()
      .from(reserva)
      .where(
        eq(
          reserva.id_reserva,
          Number(idReserva)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // BUSCAR RESERVA ACTIVA POR HORARIO
  // =====================================

  async findActivaByHorario(
    idHorario: string | number
  ): Promise<Reserva | undefined> {

    const result = await drizzleDb
      .select()
      .from(reserva)
      .where(
        and(
          eq(
            reserva.id_horario,
            Number(idHorario)
          ),
          eq(
            reserva.estado,
            "Activa"
          )
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // OBTENER RESERVAS DE UN USUARIO
  // =====================================

  async findByUsuario(
    idUsuario: string | number
  ): Promise<ReservaDetalle[]> {

    const result = await drizzleDb
      .select({
        id_reserva:
          reserva.id_reserva,

        id_usuario:
          reserva.id_usuario,

        id_horario:
          reserva.id_horario,

        estado:
          reserva.estado,

        fecha_creacion:
          reserva.fecha_creacion,

        nombre_espacio:
          espacioDeportivo.nombre,

        ubicacion:
          espacioDeportivo.ubicacion,

        fecha:
          horario.fecha,

        hora_inicio:
          horario.hora_inicio,

        hora_fin:
          horario.hora_fin,
      })

      .from(reserva)

      .innerJoin(
        horario,
        eq(
          reserva.id_horario,
          horario.id_horario
        )
      )

      .innerJoin(
        espacioDeportivo,
        eq(
          horario.id_espacio,
          espacioDeportivo.id_espacio
        )
      )

      .where(
        eq(
          reserva.id_usuario,
          Number(idUsuario)
        )
      )

      .orderBy(
        horario.fecha,
        horario.hora_inicio
      );

    return result;
  }


  // =====================================
  // CREAR RESERVA
  // =====================================

  async create(
    idUsuario: number,
    idHorario: number
  ): Promise<Reserva> {

    const result = await drizzleDb
      .insert(reserva)
      .values({
        id_usuario: idUsuario,
        id_horario: idHorario,
        estado: "Activa",

        fecha_creacion:
          sql`CURRENT_TIMESTAMP`,
      })
      .returning();

    return result[0];
  }


  // =====================================
  // CANCELAR RESERVA
  // =====================================

  async cancel(
    idReserva: string | number,
    idUsuario: string | number
  ): Promise<Reserva | undefined> {

    const result = await drizzleDb
      .update(reserva)

      .set({
        estado: "Cancelada",
      })

      .where(
        and(
          eq(
            reserva.id_reserva,
            Number(idReserva)
          ),

          eq(
            reserva.id_usuario,
            Number(idUsuario)
          ),

          eq(
            reserva.estado,
            "Activa"
          )
        )
      )

      .returning();

    return result[0];
  }
}


export default ReservaRepository;