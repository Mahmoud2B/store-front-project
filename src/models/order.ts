import client from "../database";
import { Product } from "./product";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
  products?: OrderProduct[];
};

export type OrderProduct = {
  item: Product;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT orders.id,orders.status,
                        COALESCE(json_agg(json_build_object('item',products,'quantity' ,orders_products.quantity) ORDER BY products.id) FILTER (WHERE orders_products.id IS NOT NULL),'[]') products
                        FROM orders 
                        LEFT JOIN orders_products
                        ON orders_products.order_id = orders.id 
                        LEFT JOIN products
                        ON products.id = orders_products.product_id
                        GROUP BY orders.id`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows;
    } catch (error) {
      throw new Error(`Can't list Orders ${error}`);
    }
  }
  async create(userID: number): Promise<Order> {
    try {
      const connection = await client.connect();
      //Check if user has already active order
      const activeOrderSQL = `SELECT id from orders WHERE user_id='${userID}' AND status='active'`;
      const activeOrderResult = await connection.query(activeOrderSQL);
      if (activeOrderResult.rows.length > 0) {
        throw new Error(
          "User has already an active order, please close it first"
        );
      }

      const sql = `INSERT INTO orders ( user_id, status) VALUES ('${userID}','active') RETURNING *`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Create Order \n ${(error as Error).message}`);
    }
  }
  async closeOrder(orderID: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `UPDATE orders SET status='closed' WHERE id='${orderID}' RETURNING *`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Create Order \n ${(error as Error).message}`);
    }
  }
  async showUserOrder(userID: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `SELECT orders.id,orders.status,orders.user_id,
            COALESCE(json_agg(json_build_object('item',products,'quantity' ,orders_products.quantity) ORDER BY products.id) FILTER (WHERE orders_products.id IS NOT NULL),'[]') products
            FROM orders 
            LEFT JOIN orders_products
            ON orders_products.order_id = orders.id 
            LEFT JOIN products
            ON products.id = orders_products.product_id
            WHERE orders.user_id='${userID}' GROUP BY orders.id`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Get Orders \n ${(error as Error).message}`);
    }
  }
  async addProductToOrder(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order> {
    try {
      const connection = await client.connect();

      //check if order is active

      const checkOrderSQL = `SELECT * from orders WHERE id = '${orderId}' AND status='active'`;
      const activeOrderResult = await connection.query(checkOrderSQL);
      if (activeOrderResult.rows.length < 1) {
        throw new Error(`No Active Order with id ${orderId}`);
      }
      //check if product exists on this order

      const checkProductSQL = `SELECT * from orders_products WHERE product_id = '${productId}' AND order_id = '${orderId}'`;
      const productResult = await connection.query(checkProductSQL);

      let sql = '';
      //if exists increase quantity instead of creating it again
      if (productResult.rows.length > 0) {
        const newQuantity = parseInt(productResult.rows[0].quantity) + quantity;
        sql = `UPDATE orders_products SET quantity='${newQuantity}' WHERE id = '${productResult.rows[0].id}' RETURNING *`;
      } else {
        sql = `INSERT INTO orders_products (quantity,product_id,order_id) 
        VALUES ('${quantity}','${productId}','${orderId}') RETURNING *`;
      }

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Add Product \n ${(error as Error).message}`);
    }
  }
}
