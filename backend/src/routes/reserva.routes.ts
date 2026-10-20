import express from "express";
import ReservaController from "../controllers/reserva.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const controller = new ReservaController();

/**
 * @swagger
 * /api/reservas/mias:
 *   get:
 *     summary: Obtener mis reservas
 *     description: Retorna todas las reservas pertenecientes al usuario autenticado.
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReservaDetalle'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/mias",
  authenticate,
  controller.getMisReservas
);


/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     description: Retorna una reserva perteneciente al usuario autenticado.
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ReservaId'
 *     responses:
 *       200:
 *         description: Reserva obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:id",
  authenticate,
  controller.getReserva
);


/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una reserva
 *     description: Crea una reserva para el usuario autenticado sobre un horario disponible.
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_horario
 *             properties:
 *               id_horario:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Horario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/",
  authenticate,
  controller.createReserva
);


/**
 * @swagger
 * /api/reservas/{id}/cancelar:
 *   patch:
 *     summary: Cancelar una reserva
 *     description: Cancela una reserva activa perteneciente al usuario autenticado.
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ReservaId'
 *     responses:
 *       200:
 *         description: Reserva cancelada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch(
  "/:id/cancelar",
  authenticate,
  controller.cancelReserva
);

export default router;