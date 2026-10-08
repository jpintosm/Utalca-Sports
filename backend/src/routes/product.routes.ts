import express from "express";
import ProductController from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";

// Creamos un router específico para las rutas de productos.
const router = express.Router();

// Instanciamos el controlador para delegar la lógica de cada endpoint.
const controller = new ProductController();

// GET /productos: obtiene todos los productos.
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener productos
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Listado de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", authenticate, controller.getAll);

// GET /productos/:id: obtiene un producto por su identificador.
/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por su identificador
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/ProductNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:id", authenticate, controller.getProduct);

// POST /productos: crea un nuevo producto.
/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", authenticate, controller.createProduct);

// PUT /productos/:id: actualiza un producto existente.
/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/ProductNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/:id", authenticate, controller.updateProduct);

// DELETE /productos/:id: elimina un producto existente.
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       204:
 *         description: Producto eliminado; respuesta sin contenido
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/ProductNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/:id", authenticate, controller.deleteProduct);

export default router;
