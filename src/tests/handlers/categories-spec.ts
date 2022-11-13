import assert from 'assert';
import httpMocks from 'node-mocks-http';
import { create } from '../../handlers/users';

describe('Create User Router', () => {
    it('should return Created user for POST /users/create', () => {
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/users/create',
            body: {
                first_name: 'Mabrouk',
                last_name: 'Mohamed',
                username: 'tobee',
                password: '123321Mm'
            }
        });
        const mockResponse = httpMocks.createResponse();

        create(mockRequest, mockResponse);

        const actualResponseBody = mockResponse._getJSONData();

        const expectedResponseBody = "JJ"
        assert(actualResponseBody, expectedResponseBody);
    });
});
