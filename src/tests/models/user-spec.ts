import { User, UserStore } from '../../models/user';
import bcrypt from 'bcrypt';

const store = new UserStore();

describe('Test User Model', () => {
    let user: User = {
        id: 1,
        first_name: 'mahmoud',
        last_name: 'mabrouk',
        password: '123321',
        username: 'mabrouk'
    };
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should hash the password correctly', async () => {
        const result = await store.create(user);
        expect(
            bcrypt.compareSync(
                user.password + process.env.BCRYPT_PASSWORD,
                result.password
            )
        ).toBeTrue();
    });

    it('index method should return user(s)', async () => {
        const result = await store.index();
        expect(result.length).toEqual(2);
    });

    it('Authenticate method should return user', async () => {
        const result = await store.authenticate(user.username, user.password);
        expect(result).toBeTruthy();
        expect(
            bcrypt.compareSync(
                user.password + process.env.BCRYPT_PASSWORD,
                result!.password
            )
        ).toBeTrue();
    });
});
