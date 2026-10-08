import ProductRepository from "../repositories/product.repository";
import { ValidationError, NotFoundError } from "../errors";

// Servicio que encapsula la lógica de negocio y validaciones.
class ProductService {
  // El servicio delega el acceso a datos al repositorio.
  private readonly repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  // Retorna todos los productos.
  async getProducts() {
    return await this.repository.findAll();
  }

  // Busca un producto por su identificador.
  async getProduct(id: string) {
    if (!id) {
      throw new ValidationError("El id es requerido");
    }
    const product = await this.repository.findById(id);
    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }
    return product;
  }

  // Crea un producto validando nombre y precio antes de guardarlo.
  async createProduct(name: string, price: number) {
    if (!name.trim()) {
      throw new ValidationError("Name es requerido");
    }
    if (price <= 0) {
      throw new ValidationError("Price debe ser mayor a 0");
    }
    return await this.repository.create(name, price);
  }

  // Valida los datos y delega la actualización al repositorio.
  async updateProduct(id: string, name: string, price: number) {
    if (!id) {
      throw new ValidationError("El id es requerido");
    }
    if (!name.trim()) {
      throw new ValidationError("Name es requerido");
    }
    if (price <= 0) {
      throw new ValidationError("Price debe ser mayor a 0");
    }
    const product = await this.repository.update(Number(id), name, price);
    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }
    return product;
  }

  // Solicita al repositorio la eliminación del producto indicado.
  async deleteProduct(id: string) {
    if (!id) {
      throw new ValidationError("El id es requerido");
    }
    const deleted = await this.repository.delete(Number(id));
    if (!deleted) {
      throw new NotFoundError("Producto no encontrado");
    }
    return deleted;
  }
}

export default ProductService;
