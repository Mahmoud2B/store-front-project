import request from 'supertest';
import app from '../../server';

import jwt from 'jsonwebtoken';

describe('Categories endpoint', () => {
    const token = jwt.sign({}, process.env.TOKEN_SECRET ?? '');

    it('GET /categories should return json with status 200', async () => {
        request(app)
            .get('/categories')
            .send({ token: token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });

    it('GET /categories should fail with code 401 if no token provided', async () => {
        request(app)
            .get('/categories')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
            });
    });

    it('POST /categories/create should return json with status 200', async () => {
        request(app)
            .post('/categories/create')
            .send({ token: token, name: 'test_category' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });

    it('GET /categories/:id should return json with status 200', async () => {
        request(app)
            .get('/categories/1')
            .send({ token: token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
            });
    });
});
