import { eq } from "drizzle-orm";

import { drizzleDb } from "../database/db";

import {
  espacioDeportivo,
  tipoEspacio,
} from "../database/schema";

import {
  EspacioDeportivoDetalle,
} from "../models/espacio";

class EspacioRepository {

  // =====================================
  // OBTENER TODOS LOS ESPACIOS
  // =====================================

  async findAll(): Promise<EspacioDeportivoDetalle[]> {

    const result = await drizzleDb
      .select({
        id_espacio:
          espacioDeportivo.id_espacio,

        id_tipo:
          espacioDeportivo.id_tipo,

        tipo:
          tipoEspacio.nombre,

        nombre:
          espacioDeportivo.nombre,

        ubicacion:
          espacioDeportivo.ubicacion,

        descripcion:
          espacioDeportivo.descripcion,

        precio:
          espacioDeportivo.precio,

        estado:
          espacioDeportivo.estado,
      })

      .from(espacioDeportivo)

      .innerJoin(
        tipoEspacio,
        eq(
          espacioDeportivo.id_tipo,
          tipoEspacio.id_tipo
        )
      )

      .orderBy(
        espacioDeportivo.id_espacio
      );

    return result;
  }


  // =====================================
  // BUSCAR ESPACIO POR ID
  // =====================================

  async findById(
    idEspacio: string | number
  ): Promise<EspacioDeportivoDetalle | undefined> {

    const result = await drizzleDb
      .select({
        id_espacio:
          espacioDeportivo.id_espacio,

        id_tipo:
          espacioDeportivo.id_tipo,

        tipo:
          tipoEspacio.nombre,

        nombre:
          espacioDeportivo.nombre,

        ubicacion:
          espacioDeportivo.ubicacion,

        descripcion:
          espacioDeportivo.descripcion,

        precio:
          espacioDeportivo.precio,

        estado:
          espacioDeportivo.estado,
      })

      .from(espacioDeportivo)

      .innerJoin(
        tipoEspacio,
        eq(
          espacioDeportivo.id_tipo,
          tipoEspacio.id_tipo
        )
      )

      .where(
        eq(
          espacioDeportivo.id_espacio,
          Number(idEspacio)
        )
      )

      .limit(1);

    return result[0];
  }
}

export default EspacioRepository;