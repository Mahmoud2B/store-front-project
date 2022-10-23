import express, { Request, Response } from 'express';
import { types } from 'pg';
import bodyParser from 'body-parser';
import products_routes from './handlers/products';
import categories_routes from './handlers/categories';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';
const app = express();

const port = 3000;

//This is to parse numbers that comes from pg
types.setTypeParser(1700, function (val: string) {
    return parseFloat(val);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
    res.send('Hello');
});

products_routes(app);
categories_routes(app);
users_routes(app);
orders_routes(app);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;
