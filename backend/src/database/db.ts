import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const db = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default db;

export async function initDB(): Promise<void> {

  // =====================================
  // TABLA ROL
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS rol (
      id_rol SERIAL PRIMARY KEY,
      nombre VARCHAR(50) NOT NULL
    )
  `);

  // =====================================
  // TABLA TIPO DE ESPACIO
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS tipo_espacio (
      id_tipo SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    )
  `);

  // =====================================
  // TABLA USUARIO
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS usuario (
      id_usuario SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      correo VARCHAR(150) UNIQUE NOT NULL,
      contrasena VARCHAR(255) NOT NULL,
      id_rol INTEGER NOT NULL,
      estado VARCHAR(20) NOT NULL,

      FOREIGN KEY (id_rol)
        REFERENCES rol(id_rol)
    )
  `);

  // =====================================
  // TABLA ESPACIO DEPORTIVO
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS espacio_deportivo (
      id_espacio SERIAL PRIMARY KEY,
      id_tipo INTEGER NOT NULL,
      nombre VARCHAR(150) NOT NULL,
      ubicacion VARCHAR(200),
      descripcion TEXT,
      precio NUMERIC(10,2),
      estado VARCHAR(20) NOT NULL,

      FOREIGN KEY (id_tipo)
        REFERENCES tipo_espacio(id_tipo)
    )
  `);

  // =====================================
  // TABLA HORARIO
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS horario (
      id_horario SERIAL PRIMARY KEY,
      id_espacio INTEGER NOT NULL,
      fecha DATE NOT NULL,
      hora_inicio TIME NOT NULL,
      hora_fin TIME NOT NULL,
      estado VARCHAR(20) NOT NULL,

      FOREIGN KEY (id_espacio)
        REFERENCES espacio_deportivo(id_espacio)
    )
  `);

  // =====================================
  // TABLA RESERVA
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS reserva (
      id_reserva SERIAL PRIMARY KEY,
      id_usuario INTEGER NOT NULL,
      id_horario INTEGER NOT NULL,
      estado VARCHAR(20) NOT NULL,
      fecha_creacion TIMESTAMP NOT NULL,

      FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario),

      FOREIGN KEY (id_horario)
        REFERENCES horario(id_horario)
    )
  `);

  // =====================================
  // TABLA BLOQUEO
  // =====================================
  await db.query(`
    CREATE TABLE IF NOT EXISTS bloqueo (
      id_bloqueo SERIAL PRIMARY KEY,
      id_horario INTEGER NOT NULL,
      motivo VARCHAR(100) NOT NULL,
      descripcion TEXT,
      fecha_creacion TIMESTAMP NOT NULL,

      FOREIGN KEY (id_horario)
        REFERENCES horario(id_horario)
    )
  `);

  // =====================================
// DATOS INICIALES
// =====================================

await db.query(`
  INSERT INTO rol (nombre)
  SELECT 'Administrador'
  WHERE NOT EXISTS (
    SELECT 1 FROM rol WHERE nombre = 'Administrador'
  )
`);

await db.query(`
  INSERT INTO rol (nombre)
  SELECT 'Usuario'
  WHERE NOT EXISTS (
    SELECT 1 FROM rol WHERE nombre = 'Usuario'
  )
`);

await db.query(`
  INSERT INTO usuario (
    nombre,
    apellido,
    correo,
    contrasena,
    id_rol,
    estado
  )
  SELECT
    'Admin',
    'UTalca',
    'admin@utalca.cl',
    'admin123',
    id_rol,
    'Activo'
  FROM rol
  WHERE nombre = 'Administrador'
    AND NOT EXISTS (
      SELECT 1
      FROM usuario
      WHERE correo = 'admin@utalca.cl'
    )
  `);
  console.log("Base de datos UTalca Sports inicializada correctamente");
}