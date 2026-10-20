import { eq } from "drizzle-orm";

import { drizzleDb } from "../database/db";
import { rol } from "../database/schema";
import { Rol } from "../models/rol";

class RolRepository {

  // =====================================
  // OBTENER TODOS LOS ROLES
  // =====================================

  async findAll(): Promise<Rol[]> {

    const result = await drizzleDb
      .select()
      .from(rol)
      .orderBy(rol.id_rol);

    return result;
  }


  // =====================================
  // BUSCAR ROL POR ID
  // =====================================

  async findById(
    idRol: string | number
  ): Promise<Rol | undefined> {

    const result = await drizzleDb
      .select()
      .from(rol)
      .where(
        eq(
          rol.id_rol,
          Number(idRol)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // BUSCAR ROL POR NOMBRE
  // =====================================

  async findByNombre(
    nombre: string
  ): Promise<Rol | undefined> {

    const result = await drizzleDb
      .select()
      .from(rol)
      .where(
        eq(
          rol.nombre,
          nombre
        )
      )
      .limit(1);

    return result[0];
  }
}

export default RolRepository;