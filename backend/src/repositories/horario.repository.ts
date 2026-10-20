import {
  and,
  eq,
} from "drizzle-orm";

import { drizzleDb } from "../database/db";

import {
  horario,
  reserva,
  bloqueo,
} from "../database/schema";

import {
  Horario,
  DisponibilidadHorario,
} from "../models/horario";


class HorarioRepository {

  // =====================================
  // BUSCAR HORARIO POR ID
  // =====================================

  async findById(
    idHorario: string | number
  ): Promise<Horario | undefined> {

    const result = await drizzleDb
      .select()
      .from(horario)
      .where(
        eq(
          horario.id_horario,
          Number(idHorario)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // OBTENER HORARIOS DE UN ESPACIO
  // =====================================

  async findByEspacio(
    idEspacio: string | number
  ): Promise<Horario[]> {

    const result = await drizzleDb
      .select()
      .from(horario)
      .where(
        eq(
          horario.id_espacio,
          Number(idEspacio)
        )
      )
      .orderBy(
        horario.fecha,
        horario.hora_inicio
      );

    return result;
  }


  // =====================================
  // DISPONIBILIDAD POR ESPACIO Y FECHA
  // =====================================

  async findByEspacioAndFecha(
    idEspacio: string | number,
    fecha: string
  ): Promise<DisponibilidadHorario[]> {

    // Reservas activas agrupadas por horario.
    // Así obtenemos como máximo una coincidencia
    // por cada horario.
    const reservasActivas = drizzleDb
      .select({
        id_horario: reserva.id_horario,
      })
      .from(reserva)
      .where(
        eq(
          reserva.estado,
          "Activa"
        )
      )
      .groupBy(
        reserva.id_horario
      )
      .as("reservas_activas");


    // Bloqueos agrupados por horario.
    const bloqueosExistentes = drizzleDb
      .select({
        id_horario: bloqueo.id_horario,
      })
      .from(bloqueo)
      .groupBy(
        bloqueo.id_horario
      )
      .as("bloqueos_existentes");


    const result = await drizzleDb
      .select({
        id_horario:
          horario.id_horario,

        id_espacio:
          horario.id_espacio,

        fecha:
          horario.fecha,

        hora_inicio:
          horario.hora_inicio,

        hora_fin:
          horario.hora_fin,

        estado:
          horario.estado,

        id_reserva_activa:
          reservasActivas.id_horario,

        id_bloqueo:
          bloqueosExistentes.id_horario,
      })

      .from(horario)

      .leftJoin(
        reservasActivas,
        eq(
          horario.id_horario,
          reservasActivas.id_horario
        )
      )

      .leftJoin(
        bloqueosExistentes,
        eq(
          horario.id_horario,
          bloqueosExistentes.id_horario
        )
      )

      .where(
        and(
          eq(
            horario.id_espacio,
            Number(idEspacio)
          ),
          eq(
            horario.fecha,
            fecha
          )
        )
      )

      .orderBy(
        horario.hora_inicio
      );


    return result.map((item) => {

      let disponibilidad =
        "Disponible";

      if (
        item.estado !== "Habilitado"
      ) {
        disponibilidad =
          "Deshabilitado";
      }

      else if (
        item.id_reserva_activa !== null
      ) {
        disponibilidad =
          "Reservado";
      }

      else if (
        item.id_bloqueo !== null
      ) {
        disponibilidad =
          "Bloqueado";
      }


      const disponible =
        disponibilidad === "Disponible";


      return {
        id_horario:
          item.id_horario,

        id_espacio:
          item.id_espacio,

        fecha:
          item.fecha,

        hora_inicio:
          item.hora_inicio,

        hora_fin:
          item.hora_fin,

        estado:
          item.estado,

        disponible,

        disponibilidad,
      };
    });
  }


  // =====================================
  // ALIAS PARA COMPATIBILIDAD
  // =====================================

  async findDisponibilidad(
    idEspacio: string | number,
    fecha: string
  ): Promise<DisponibilidadHorario[]> {

    return await this.findByEspacioAndFecha(
      idEspacio,
      fecha
    );
  }
}


export default HorarioRepository;