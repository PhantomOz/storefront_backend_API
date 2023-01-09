import client from "../utils/database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderItem = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
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
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete' ORDER BY id DESC";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch ({ message }) {
      throw new Error(`Can't get completed orders by user, Error -${message}`);
    }
  } // Getting users completed orders

  async create(user_id: number, status: string = "active"): Promise<Order> {
    try {
      //ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      return result.rows[0];
    } catch ({ message }) {
      throw new Error(`Can't Create Order, here is the error - ${message}`);
    }
  } // Creating Active orders

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number,
    user_id: number
  ): Promise<OrderItem> {
    try {
      const pSql = "SELECT * FROM orders WHERE id = $1 AND user_id = $2";
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();

      const d_order = await conn.query(pSql, [orderId, user_id]);

      if (d_order.rows.length > 0 && d_order.rows[0].status === "active") {
        const result = await conn.query(sql, [quantity, orderId, productId]);

        const order = result.rows[0];

        conn.release();
        return order;
      }
      throw new Error(
        `Order with id-${orderId} does not belong to user with id-${user_id}`
      );
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  } //Adding Products to order
}
