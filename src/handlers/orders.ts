import express, { Request, Response } from 'express';
import checkJWT from '../middlewares/authToken';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (error) {
        res.status(400).send(
            `Something went wrong! \n ${(error as Error).message}`
        );
    }
};

const create = async (req: Request, res: Response) => {
    try {
        if (req.body.userID == null) {
            res.status(400).send('User ID is required');
            return;
        }
        const order = await store.create(req.body.userID);
        res.json(order);
    } catch (error) {
        res.status(400).send(
            `Something went wrong! \n ${(error as Error).message}`
        );
    }
};
const closeOrder = async (req: Request, res: Response) => {
    try {
        if (req.body.orderID == null) {
            res.status(400).send('Order ID is required');
            return;
        }
        const order = await store.closeOrder(req.body.orderID);
        res.json(order);
    } catch (error) {
        res.status(400).send(
            `Something went wrong! \n ${(error as Error).message}`
        );
    }
};
const showUserOrder = async (req: Request, res: Response) => {
    try {
        if (req.body.userID == null) {
            res.status(400).send('User ID is required');
            return;
        }
        const order = await store.showUserOrder(parseInt(req.body.userID));

        res.json(order);
    } catch (error) {
        res.status(400).send(
            `Something went wrong! \n ${(error as Error).message}`
        );
    }
};

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        if (
            req.body.orderId == null ||
            req.body.productId == null ||
            req.body.quantity == null
        ) {
            res.status(400).send(
                'Order ID, Product ID, and Quantity are required'
            );
            return;
        }
        const order = await store.addProductToOrder(
            parseInt(req.body.orderId),
            parseInt(req.body.productId),
            parseInt(req.body.quantity)
        );

        res.json(order);
    } catch (error) {
        res.status(400).send(
            `Something went wrong! \n ${(error as Error).message}`
        );
    }
};

const orders_routes = (app: express.Application) => {
    app.get('/orders', checkJWT, index);
    app.post('/orders/create', checkJWT, create);
    app.get('/orders/get_user_current_order', checkJWT, showUserOrder);
    app.post('/orders/add_product', checkJWT, addProductToOrder);
    app.post('/orders/close_order', checkJWT, closeOrder);
};

export default orders_routes;
