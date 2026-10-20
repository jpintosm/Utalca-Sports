import {
  eq,
  sql,
} from "drizzle-orm";

import { drizzleDb } from "../database/db";
import { bloqueo } from "../database/schema";
import { Bloqueo } from "../models/bloqueo";


class BloqueoRepository {

  // =====================================
  // BUSCAR BLOQUEO POR ID
  // =====================================

  async findById(
    idBloqueo: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await drizzleDb
      .select()
      .from(bloqueo)
      .where(
        eq(
          bloqueo.id_bloqueo,
          Number(idBloqueo)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // BUSCAR BLOQUEO POR HORARIO
  // =====================================

  async findByHorario(
    idHorario: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await drizzleDb
      .select()
      .from(bloqueo)
      .where(
        eq(
          bloqueo.id_horario,
          Number(idHorario)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // CREAR BLOQUEO
  // =====================================

  async create(
    idHorario: number,
    motivo: string,
    descripcion: string | null
  ): Promise<Bloqueo> {

    const result = await drizzleDb
      .insert(bloqueo)
      .values({
        id_horario: idHorario,
        motivo,
        descripcion,
        fecha_creacion:
          sql`CURRENT_TIMESTAMP`,
      })
      .returning();

    return result[0];
  }


  // =====================================
  // ELIMINAR BLOQUEO
  // =====================================

  async remove(
    idBloqueo: string | number
  ): Promise<Bloqueo | undefined> {

    const result = await drizzleDb
      .delete(bloqueo)
      .where(
        eq(
          bloqueo.id_bloqueo,
          Number(idBloqueo)
        )
      )
      .returning();

    return result[0];
  }
}


export default BloqueoRepository;