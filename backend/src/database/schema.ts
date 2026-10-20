import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  numeric,
  date,
  time,
  timestamp,
} from "drizzle-orm/pg-core";


// =====================================
// ROL
// =====================================

export const rol = pgTable("rol", {
  id_rol: serial("id_rol").primaryKey(),

  nombre: varchar("nombre", {
    length: 50,
  }).notNull(),
});


// =====================================
// TIPO DE ESPACIO
// =====================================

export const tipoEspacio = pgTable(
  "tipo_espacio",
  {
    id_tipo: serial("id_tipo").primaryKey(),

    nombre: varchar("nombre", {
      length: 100,
    }).notNull(),
  }
);


// =====================================
// USUARIO
// =====================================

export const usuario = pgTable(
  "usuario",
  {
    id_usuario: serial("id_usuario")
      .primaryKey(),

    nombre: varchar("nombre", {
      length: 100,
    }).notNull(),

    apellido: varchar("apellido", {
      length: 100,
    }).notNull(),

    correo: varchar("correo", {
      length: 150,
    })
      .notNull()
      .unique(),

    contrasena: varchar("contrasena", {
      length: 255,
    }).notNull(),

    id_rol: integer("id_rol")
      .notNull()
      .references(() => rol.id_rol),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),
  }
);


// =====================================
// ESPACIO DEPORTIVO
// =====================================

export const espacioDeportivo = pgTable(
  "espacio_deportivo",
  {
    id_espacio: serial("id_espacio")
      .primaryKey(),

    id_tipo: integer("id_tipo")
      .notNull()
      .references(
        () => tipoEspacio.id_tipo
      ),

    nombre: varchar("nombre", {
      length: 150,
    }).notNull(),

    ubicacion: varchar("ubicacion", {
      length: 200,
    }),

    descripcion: text("descripcion"),

    precio: numeric("precio", {
      precision: 10,
      scale: 2,
      mode: "number",
    }),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),
  }
);


// =====================================
// HORARIO
// =====================================

export const horario = pgTable(
  "horario",
  {
    id_horario: serial("id_horario")
      .primaryKey(),

    id_espacio: integer("id_espacio")
      .notNull()
      .references(
        () => espacioDeportivo.id_espacio
      ),

    fecha: date("fecha", {
      mode: "string",
    }).notNull(),

    hora_inicio: time("hora_inicio")
      .notNull(),

    hora_fin: time("hora_fin")
      .notNull(),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),
  }
);


// =====================================
// RESERVA
// =====================================

export const reserva = pgTable(
  "reserva",
  {
    id_reserva: serial("id_reserva")
      .primaryKey(),

    id_usuario: integer("id_usuario")
      .notNull()
      .references(
        () => usuario.id_usuario
      ),

    id_horario: integer("id_horario")
      .notNull()
      .references(
        () => horario.id_horario
      ),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),

    fecha_creacion: timestamp(
      "fecha_creacion",
      {
        mode: "string",
      }
    ).notNull(),
  }
);


// =====================================
// BLOQUEO
// =====================================

export const bloqueo = pgTable(
  "bloqueo",
  {
    id_bloqueo: serial("id_bloqueo")
      .primaryKey(),

    id_horario: integer("id_horario")
      .notNull()
      .references(
        () => horario.id_horario
      ),

    motivo: varchar("motivo", {
      length: 100,
    }).notNull(),

    descripcion: text("descripcion"),

    fecha_creacion: timestamp(
      "fecha_creacion",
      {
        mode: "string",
      }
    ).notNull(),
  }
);