import client from "../database";

export type Category = {
  id?: number;
  name: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM categories";

      const request = await connection.query(sql);
      connection.release();

      return request.rows;
    } catch (error) {
      throw new Error(`Can't list categories ${error}`);
    }
  }
  async create(category: Category): Promise<Category> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO categories (name) VALUES ('${category.name}') RETURNING *`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Create category ${error}`);
    }
  }
  async show(id: number): Promise<Category> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM categories WHERE id=${id}`;

      const request = await connection.query(sql);
      connection.release();

      return request.rows[0];
    } catch (error) {
      throw new Error(`Can't Create Category ${error}`);
    }
  }
}
