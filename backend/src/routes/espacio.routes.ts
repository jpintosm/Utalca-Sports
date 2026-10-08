import express from "express";
import EspacioController from "../controllers/espacio.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const controller = new EspacioController();

/**
 * @swagger
 * /api/espacios:
 *   get:
 *     summary: Obtener todos los espacios deportivos
 *     description: Retorna el listado de todos los espacios deportivos registrados en el sistema.
 *     tags:
 *       - Espacios deportivos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de espacios deportivos obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EspacioDeportivo'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/",
  authenticate,
  controller.getAll
);

/**
 * @swagger
 * /api/espacios/{id}:
 *   get:
 *     summary: Obtener un espacio deportivo por ID
 *     description: Retorna la información detallada de un espacio deportivo según su identificador.
 *     tags:
 *       - Espacios deportivos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EspacioId'
 *     responses:
 *       200:
 *         description: Espacio deportivo encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EspacioDeportivo'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/EspacioNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:id",
  authenticate,
  controller.getEspacio
);

export default router;