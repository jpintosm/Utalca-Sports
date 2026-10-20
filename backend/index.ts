import express from "express";
import authRoutes from "./src/routes/auth.routes";
import { errorHandler } from "./src/middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import specs from "./src/swagger";
import espacioRoutes from "./src/routes/espacio.routes";
import horarioRoutes from "./src/routes/horario.routes";
import reservaRoutes from "./src/routes/reserva.routes";
import bloqueoRoutes from "./src/routes/bloqueo.routes";

// Creamos la aplicación Express principal.
const app = express();

// Permite recibir JSON en los cuerpos de las solicitudes HTTP.
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/espacios", espacioRoutes);

app.use("/api/espacios", horarioRoutes);

app.use("/api/reservas", reservaRoutes);

app.use(
  "/api/bloqueos",
  bloqueoRoutes
);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    "Servidor UTalca Sports ejecutándose en puerto 3000"
  );
});