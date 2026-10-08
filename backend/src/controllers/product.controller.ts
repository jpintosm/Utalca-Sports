import { Request, Response, NextFunction } from "express";
import ProductService from "../services/product.service";

// Controlador HTTP de productos: traduce requests/responses de Express a llamadas al servicio.
class ProductController {
  // Instancia propia del servicio (sin inyección de dependencias por ahora).
  private readonly service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  // GET /api/productos: devuelve el listado completo de productos.
  getAll = async (_req: Request, res: Response): Promise<void> => {
    const products = await this.service.getProducts();
    res.json(products);
  };

  // GET /api/productos/:id: devuelve un producto o `null` si no existe.
  getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // Express puede devolver un string o un arreglo para params, por eso se normaliza.
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const product = await this.service.getProduct(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/productos: crea un producto a partir del body (name, price).
  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // Se extrae el body y se tipa de forma mínima para validar los campos.
    try {
      const { name, price } = req.body as { name?: string; price?: number };
      const product = await this.service.createProduct(name ?? "", price ?? 0);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/productos/:id: actualiza name/price; responde 404 si el producto no existe.
  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const { name, price } = req.body;
      const product = await this.service.updateProduct(id, name, price);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/productos/:id: elimina el producto; responde 404 si no existía.
  deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      await this.service.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
