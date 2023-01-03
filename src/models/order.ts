import client from "../utils/database";

export type Order = {
  id: number;
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
      const sql = "SELECT * FROM orders WHERE user_id = $1 DESC";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Can't get active orders by user");
    }
  } // Getting user current active order

  async completeOrder(user_id: number): Promise<Order[]> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'completed' DESC";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Can't get completed orders by user");
    }
  } // Getting users completed orders
}
