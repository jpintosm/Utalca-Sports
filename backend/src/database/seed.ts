import { eq } from "drizzle-orm";

import { drizzleDb } from "./db";
import {
  rol,
  usuario,
  tipoEspacio,
  espacioDeportivo,
  horario,
} from "./schema";


async function seed(): Promise<void> {
  try {

    console.log("Ejecutando seed...");


    // =====================================
    // ROL ADMINISTRADOR
    // =====================================

    let adminRole = await drizzleDb
      .select()
      .from(rol)
      .where(
        eq(
          rol.nombre,
          "Administrador"
        )
      )
      .limit(1);


    if (adminRole.length === 0) {

      adminRole = await drizzleDb
        .insert(rol)
        .values({
          nombre: "Administrador",
        })
        .returning();

    }


    // =====================================
    // ROL USUARIO
    // =====================================

    const userRole = await drizzleDb
      .select()
      .from(rol)
      .where(
        eq(
          rol.nombre,
          "Usuario"
        )
      )
      .limit(1);


    if (userRole.length === 0) {

      await drizzleDb
        .insert(rol)
        .values({
          nombre: "Usuario",
        });

    }


    // =====================================
    // USUARIO ADMINISTRADOR
    // =====================================

    const adminUser = await drizzleDb
      .select()
      .from(usuario)
      .where(
        eq(
          usuario.correo,
          "admin@utalca.cl"
        )
      )
      .limit(1);


    if (adminUser.length === 0) {

      await drizzleDb
        .insert(usuario)
        .values({
          nombre: "Admin",
          apellido: "UTalca",
          correo: "admin@utalca.cl",
          contrasena: "admin123",
          id_rol: adminRole[0].id_rol,
          estado: "Activo",
        });

    }

  // =====================================
  // TIPO DE ESPACIO DE PRUEBA
  // =====================================

  let tipoCancha = await drizzleDb
    .select()
    .from(tipoEspacio)
    .where(
      eq(
        tipoEspacio.nombre,
        "Cancha"
      )
    )
    .limit(1);

  if (tipoCancha.length === 0) {

    tipoCancha = await drizzleDb
      .insert(tipoEspacio)
      .values({
        nombre: "Cancha",
      })
      .returning();
  }


  // =====================================
  // ESPACIO DEPORTIVO DE PRUEBA
  // =====================================

  let cancha = await drizzleDb
    .select()
    .from(espacioDeportivo)
    .where(
      eq(
        espacioDeportivo.nombre,
        "Cancha de fútbol 1"
      )
    )
    .limit(1);

  if (cancha.length === 0) {

    cancha = await drizzleDb
      .insert(espacioDeportivo)
      .values({
        id_tipo: tipoCancha[0].id_tipo,
        nombre: "Cancha de fútbol 1",
        ubicacion: "Campus Talca",
        descripcion:
          "Cancha deportiva para pruebas del sistema",
        precio: 10000,
        estado: "Activo",
      })
      .returning();
  }


  // =====================================
  // HORARIO DE PRUEBA
  // =====================================

  const horarioExistente = await drizzleDb
    .select()
    .from(horario)
    .where(
      eq(
        horario.id_espacio,
        cancha[0].id_espacio
      )
    )
    .limit(1);

  if (horarioExistente.length === 0) {

    await drizzleDb
      .insert(horario)
      .values({
        id_espacio:
          cancha[0].id_espacio,

        fecha:
          "2026-10-15",

        hora_inicio:
          "10:00:00",

        hora_fin:
          "11:00:00",

        estado:
          "Habilitado",
      });
  }
    console.log(
      "Seed ejecutado correctamente"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Error al ejecutar seed:",
      error
    );

    process.exit(1);
  }
}


seed();