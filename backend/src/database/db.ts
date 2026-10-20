import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import path from "path";
import dotenv from "dotenv";

import * as schema from "./schema";


// =====================================
// VARIABLES DE ENTORNO
// =====================================

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});


// =====================================
// CONEXIÓN POSTGRESQL
// =====================================

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});


// =====================================
// DRIZZLE ORM
// =====================================

export const drizzleDb = drizzle({
  client: pool,
  schema,
});


// =====================================
// POOL POSTGRESQL
// =====================================

export default pool;