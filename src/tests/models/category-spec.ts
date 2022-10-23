import { Category, CategoryStore } from '../../models/category';

const store = new CategoryStore();

describe('Test Category Model', () => {
    let category: Category = {
        id: 2,
        name: 'Mobile Phones'
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

    it('create method should add a category', async () => {
        const result = await store.create(category);
        expect(result).toEqual(category);
    });

    it('index method should return categories', async () => {
        const result = await store.index();
        // category DB already have one record so this will be the second one
        expect(result[1]).toEqual(category);
    });

    it('show method should return a category', async () => {
        //same here
        const result = await store.show(2);
        expect(result).toEqual(category);
    });
});
