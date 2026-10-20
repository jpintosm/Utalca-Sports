import { eq } from "drizzle-orm";

import { drizzleDb } from "../database/db";
import { tipoEspacio } from "../database/schema";
import { TipoEspacio } from "../models/tipoEspacio";

class TipoEspacioRepository {

  // =====================================
  // OBTENER TODOS LOS TIPOS DE ESPACIO
  // =====================================

  async findAll(): Promise<TipoEspacio[]> {

    const result = await drizzleDb
      .select()
      .from(tipoEspacio)
      .orderBy(tipoEspacio.id_tipo);

    return result;
  }


  // =====================================
  // BUSCAR TIPO DE ESPACIO POR ID
  // =====================================

  async findById(
    idTipo: string | number
  ): Promise<TipoEspacio | undefined> {

    const result = await drizzleDb
      .select()
      .from(tipoEspacio)
      .where(
        eq(
          tipoEspacio.id_tipo,
          Number(idTipo)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // BUSCAR TIPO DE ESPACIO POR NOMBRE
  // =====================================

  async findByNombre(
    nombre: string
  ): Promise<TipoEspacio | undefined> {

    const result = await drizzleDb
      .select()
      .from(tipoEspacio)
      .where(
        eq(
          tipoEspacio.nombre,
          nombre
        )
      )
      .limit(1);

    return result[0];
  }
}

export default TipoEspacioRepository;