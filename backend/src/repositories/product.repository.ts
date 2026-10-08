import db from "../database/db";
import { Product } from "../models/product";

// Repositorio encargado de guardar y consultar los productos en memoria.
class ProductRepository {
  // Devuelve todos los productos almacenados.
  async findAll(): Promise<Product[]> {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        price
      FROM products
      ORDER BY id
      `,
    );
    return result.rows;
  }

  // Busca un producto por su id y devuelve el primero coincidente.
  async findById(id: string | number): Promise<Product | undefined> {
    const result = await db.query(
      `
      SELECT
        id,
        name,
        price
      FROM products
      WHERE id = $1
      `,
      [id],
    );
    return result.rows[0];
  }

  // Crea un producto nuevo y lo agrega al arreglo.
  async create(name: string, price: number): Promise<Product> {
    const result = await db.query(
      `
      INSERT INTO products(
        name,
        price
      )
      VALUES
      (
        $1,
        $2
      )
      RETURNING *
      `,
      [name, price],
    );
    return result.rows[0];
  }

  // Actualiza los datos de un producto existente.
  async update(
    id: number,
    name: string,
    price: number,
  ): Promise<Product | undefined> {
    const result = await db.query(
      `
      UPDATE products
      SET
        name = $1,
        price = $2
      WHERE id = $3
      RETURNING *
      `,
      [name, price, id],
    );
    return result.rows[0];
  }

  // Elimina un producto y devuelve si la operación fue exitosa.
  async delete(id: number): Promise<boolean> {
    const result = await db.query(
      `
      DELETE FROM products
      WHERE id = $1
      `,
      [id],
    );
    return result.rowCount === 1;
  }
}

export default ProductRepository;
