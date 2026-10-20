import path from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzleDb } from "./db";


async function runMigrations(): Promise<void> {
  try {
    console.log("Ejecutando migraciones...");

    await migrate(
      drizzleDb,
      {
        migrationsFolder: path.resolve(
          __dirname,
          "../../drizzle"
        ),
      }
    );

    console.log(
      "Migraciones aplicadas correctamente"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Error al ejecutar las migraciones:",
      error
    );

    process.exit(1);
  }
}


runMigrations();