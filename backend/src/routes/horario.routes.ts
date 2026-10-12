import express from "express";
import HorarioController from "../controllers/horario.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const controller = new HorarioController();

/**
 * @swagger
 * /api/espacios/{id}/horarios:
 *   get:
 *     summary: Obtener horarios de un espacio deportivo
 *     description: Retorna todos los horarios registrados para un espacio deportivo.
 *     tags:
 *       - Horarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EspacioId'
 *     responses:
 *       200:
 *         description: Horarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/EspacioNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:id/horarios",
  authenticate,
  controller.getByEspacio
);

/**
 * @swagger
 * /api/espacios/{id}/disponibilidad:
 *   get:
 *     summary: Consultar horarios de un espacio según fecha
 *     description: Retorna los horarios registrados para un espacio deportivo en una fecha determinada.
 *     tags:
 *       - Disponibilidad
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EspacioId'
 *       - name: fecha
 *         in: query
 *         required: true
 *         description: Fecha que se desea consultar
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-10-10"
 *     responses:
 *       200:
 *         description: Horarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/EspacioNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:id/disponibilidad",
  authenticate,
  controller.getByEspacioAndFecha
);

export default router;