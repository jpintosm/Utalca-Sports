import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

const authController = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesion y obtener un token JWT
 *     tags:
 *       - Autenticacion
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 writeOnly: true
 *                 example: clave-de-ejemplo
 *     responses:
 *       200:
 *         description: Autenticacion correcta; el token expira en una hora
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - token
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticar las solicitudes de productos
 *       500:
 *         description: Credenciales invalidas o error interno del servidor (comportamiento actual)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.post("/login", authController.login);

export default router;
