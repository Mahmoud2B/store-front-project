import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Test Product Model', () => {
    let product: Product = {
        id: 1,
        category_id: 1,
        name: 'Iphone 14 pro max',
        price: 1100.1
    };
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a Product', async () => {
        const result = await store.create(product);
        expect(result).toEqual(product);
    });

    it('index method should return product(s)', async () => {
        const result = await store.index();
        expect(result).toEqual([product]);
    });

    it('show method should return a product', async () => {
        const result = await store.show(1);
        expect(result).toEqual(product);
    });
});
