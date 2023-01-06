import client from "../utils/database";

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async currentOrder(user_id: number): Promise<Order> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch ({ message }) {
      throw new Error(`Can't get active orders by user, Error - ${message}`);
    }
  } // Getting user current active order

  async completeOrder(user_id: number): Promise<Order[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'completed' ORDER BY id DESC";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch ({ message }) {
      throw new Error(`Can't get completed orders by user, Error -${message}`);
    }
  } // Getting users completed orders

  async create(
    user_id: number,
    product_id: number,
    quantity: number,
    status: string = "active"
  ): Promise<Order> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        user_id,
        product_id,
        quantity,
        status,
      ]);
      conn.release();
      return result.rows[0];
    } catch ({ message }) {
      throw new Error(`Can't Create Order, here is the error - ${message}`);
    }
  } // Creating Active orders
}
