import express, { Request, Response } from 'express';
import checkJWT from '../middlewares/authToken';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400).send('Something went wrong!');
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    let name: string = req.body.name as string;
    let price: number = req.body.price as number;
    let categoryId: number = req.body.category_id as number;

    if (name == null || price == null || categoryId == null) {
        res.status(400).send('Product data is missing one or more field(s)');
        return;
    }
    try {
        let product: Product = {
            name: name,
            price: price,
            category_id: categoryId
        };
        const createdProduct: Product = await store.create(product);
        res.json(createdProduct);
    } catch (error) {
        res.status(400).send(`Something went wrong! ${error}`);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const product = await store.show(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product do not exist');
        }
    } catch (error) {
        res.status(400).send('Something went wrong!');
    }
};

const products_routes = (app: express.Application): void => {
    app.get('/products', index);
    app.post('/products/create',checkJWT, create);
    app.get('/products/:id', show);
};

export default products_routes;
