import request from 'supertest';
import app from '../../server';

import jwt from 'jsonwebtoken';

describe('Orders endpoint', () => {
    const token = jwt.sign({}, process.env.TOKEN_SECRET ?? '');

    it('GET /orders should return json with status 200', (done) => {
        request(app)
            .get('/orders')
            .send({ token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });
    it('POST /orders/create should return json with status 200', (done) => {
        request(app)
            .post('/orders/create')
            .send({ token, userID: 1 })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });

    it('POST /orders/close_order should return json with status 200', (done) => {
        request(app)
            .post('/orders/close_order')
            .send({ token, orderID: 1 })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });
});
