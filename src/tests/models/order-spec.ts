import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';

const store = new OrderStore();
const userStoreInstance = new UserStore();

describe('Test Order Model', () => {
    const order: Order = {
        id: 1,
        status: 'active',
        user_id: 1
    };
    const closedOrder: Order = {
        id: 1,
        status: 'closed',
        user_id: 1
    };
    const orderWithProduct: Order = {
        id: 1,
        status: 'active',
        user_id: 1,
        products: []
    };
    beforeAll(() => {
        //Create user for the Order to pass
        userStoreInstance.create({
            first_name: 'test',
            last_name: 'test',
            password: '123',
            username: 'test'
        });
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a showUserOrder method', () => {
        expect(store.showUserOrder).toBeDefined();
    });

    it('should have a addProductToOrder method', () => {
        expect(store.addProductToOrder).toBeDefined();
    });

    it('should have a closeOrder method', () => {
        expect(store.closeOrder).toBeDefined();
    });

    it('create method should return order added', async () => {
        const result = await store.create(1);
        expect(result).toBeInstanceOf(Object);
    });

    it('showUserOrder method should return specified order', async () => {
        const result = await store.showUserOrder(1);
        expect(result).toBeInstanceOf(Object);
    });

    it("closeOrder method should return order with 'closed' status", async () => {
        const result = await store.closeOrder(1);
        expect(result).toBeInstanceOf(Object);
    });
});
