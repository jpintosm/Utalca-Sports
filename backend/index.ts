import express from "express";
import productRoutes from "./src/routes/product.routes";
import authRoutes from "./src/routes/auth.routes";
import { initDB } from "./src/database/db";
import { errorHandler } from "./src/middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import specs from "./src/swagger";
import espacioRoutes from "./src/routes/espacio.routes";
// Creamos la aplicación Express principal.
const app = express();

// Permite recibir JSON en los cuerpos de las solicitudes HTTP.
app.use(express.json());

// Monta todas las rutas de productos bajo el prefijo /productos.
app.use("/api/productos", productRoutes);


app.use("/api/auth", authRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/espacios", espacioRoutes);

app.use(errorHandler);

// Verifica que la tabla products exista antes de aceptar solicitudes.
initDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("El servidor esta corriendo en la url http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("No se pudo verificar la base de datos:", error);
    process.exit(1);
  });
