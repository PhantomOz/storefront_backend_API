import client from "../utils/database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Cannot get Product from database");
    }
  } // Get all Products from database

  async show(id: number): Promise<Product> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch ({ message }) {
      throw new Error(`Cannot get this product from database err - ${message}`);
    }
  } // Get a Product by Id from database

  async create(product: Product): Promise<Product> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch ({ message }) {
      throw new Error(
        `Cannot create product - \n ${product} \n with err - ${message}`
      );
    }
  } // Creating new Products in database

  async topFive(): Promise<Product[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch ({ message }) {
      throw new Error(`Can't get products from database err - ${message}`);
    }
  } // Getting Top 5 Products in database

  async getCategories(category: string): Promise<Product[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE category = $1";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get products with category = ${category}`);
    }
  } // Getting Categories of Prodycts from database
}
