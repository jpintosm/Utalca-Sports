import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

export default defineConfig({
  dialect: "postgresql",

  schema: "./src/database/schema.ts",

  out: "./drizzle",

  dbCredentials: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "utalca_sports",
  },

  verbose: true,
  strict: true,
});