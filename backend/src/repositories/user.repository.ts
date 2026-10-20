import { eq } from "drizzle-orm";

import { drizzleDb } from "../database/db";
import {
  usuario,
  rol,
} from "../database/schema";

import { UsuarioConRol } from "../models/user";

class UsuarioRepository {

  // =====================================
  // BUSCAR USUARIO POR CORREO
  // =====================================

  async findByEmail(
    correo: string
  ): Promise<UsuarioConRol | undefined> {

    const result = await drizzleDb
      .select({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        id_rol: usuario.id_rol,
        estado: usuario.estado,
        rol: rol.nombre,
      })
      .from(usuario)
      .innerJoin(
        rol,
        eq(
          usuario.id_rol,
          rol.id_rol
        )
      )
      .where(
        eq(
          usuario.correo,
          correo
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // BUSCAR USUARIO POR ID
  // =====================================

  async findById(
    idUsuario: string | number
  ): Promise<UsuarioConRol | undefined> {

    const result = await drizzleDb
      .select({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        id_rol: usuario.id_rol,
        estado: usuario.estado,
        rol: rol.nombre,
      })
      .from(usuario)
      .innerJoin(
        rol,
        eq(
          usuario.id_rol,
          rol.id_rol
        )
      )
      .where(
        eq(
          usuario.id_usuario,
          Number(idUsuario)
        )
      )
      .limit(1);

    return result[0];
  }


  // =====================================
  // OBTENER TODOS LOS USUARIOS
  // =====================================

  async findAll(): Promise<UsuarioConRol[]> {

    const result = await drizzleDb
      .select({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        id_rol: usuario.id_rol,
        estado: usuario.estado,
        rol: rol.nombre,
      })
      .from(usuario)
      .innerJoin(
        rol,
        eq(
          usuario.id_rol,
          rol.id_rol
        )
      )
      .orderBy(
        usuario.id_usuario
      );

    return result;
  }
}

export default UsuarioRepository;