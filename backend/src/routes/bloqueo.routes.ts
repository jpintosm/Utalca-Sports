import express from "express";

import BloqueoController from "../controllers/bloqueo.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

import {
  authorizeRoles,
} from "../middlewares/role.middleware";


const router = express.Router();

const controller =
  new BloqueoController();


/**
 * @swagger
 * /api/bloqueos/{id}:
 *   get:
 *     summary: Obtener un bloqueo por ID
 *     tags:
 *       - Bloqueos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bloqueo
 *     responses:
 *       200:
 *         description: Bloqueo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bloqueo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Bloqueo no encontrado
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
  authorizeRoles("Administrador"),
  controller.getBloqueo
);


/**
 * @swagger
 * /api/bloqueos:
 *   post:
 *     summary: Bloquear un horario
 *     tags:
 *       - Bloqueos
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
 *               - motivo
 *             properties:
 *               id_horario:
 *                 type: integer
 *                 example: 1
 *               motivo:
 *                 type: string
 *                 example: Mantención
 *               descripcion:
 *                 type: string
 *                 nullable: true
 *                 example: Mantención programada de la cancha
 *     responses:
 *       201:
 *         description: Horario bloqueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bloqueo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
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
  authorizeRoles("Administrador"),
  controller.createBloqueo
);


/**
 * @swagger
 * /api/bloqueos/{id}:
 *   delete:
 *     summary: Eliminar un bloqueo
 *     tags:
 *       - Bloqueos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bloqueo
 *     responses:
 *       200:
 *         description: Bloqueo eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bloqueo'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Bloqueo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("Administrador"),
  controller.removeBloqueo
);


export default router;