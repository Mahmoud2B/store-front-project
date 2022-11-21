import request from 'supertest';
import app from '../../server';

import jwt from 'jsonwebtoken';

describe('Products endpoint', () => {
    const token = jwt.sign({}, process.env.TOKEN_SECRET ?? '');

    it('GET /products should return json with status 200', async () => {
        request(app)
            .get('/products')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });

    it('POST /products/create should return json with status 200', async () => {
        request(app)
            .post('/products/create')
            .send({
                name: 'Some Item 221',
                price: 12.31,
                category_id: 1,
                token
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });
});
