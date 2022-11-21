import request from 'supertest';
import app from '../../server';

import jwt from 'jsonwebtoken';

describe('Users endpoint', () => {
    const token = jwt.sign({}, process.env.TOKEN_SECRET ?? '');

    it('GET /users should return json with status 200', (done) => {
        request(app)
            .get('/users')
            .send({ token: token })
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

    it('POST /users/create should return json with status 200', (done) => {
        request(app)
            .post('/users/create')
            .send({
                first_name: 'Mabrouk',
                last_name: 'Mohamed',
                username: 'tobee3',
                password: '123321'
            })
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
});
