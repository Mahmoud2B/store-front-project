import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category_id: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT * FROM products';

            const request = await connection.query(sql);
            connection.release();

            return request.rows;
        } catch (error) {
            throw new Error(`Can't list products ${error}`);
        }
    }
    async create(product: Product): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = `INSERT INTO products (name, price, category_id) VALUES ('${product.name}',${product.price},${product.category_id}) RETURNING *`;

            const request = await connection.query(sql);
            connection.release();

            return request.rows[0];
        } catch (error) {
            throw new Error(`Can't Create Product ${error}`);
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = `SELECT * FROM products WHERE id=${id}`;

            const request = await connection.query(sql);
            connection.release();

            return request.rows[0];
        } catch (error) {
            throw new Error(`Can't Create Product ${error}`);
        }
    }
}
