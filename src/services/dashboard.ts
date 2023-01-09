import client from "../utils/database";

export type ProductOrders = {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  order_id: number;
  product_id: number;
};
export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<ProductOrders[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM products INNER JOIN order_products ON products.id = order_products.product_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
