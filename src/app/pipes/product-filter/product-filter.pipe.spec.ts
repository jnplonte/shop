import { ProductFilterPipe } from './product-filter.pipe';

describe('ProductFilterPipe', () => {
    let pipe: ProductFilterPipe;

    beforeEach(() => {
        pipe = new ProductFilterPipe();
    });

    it('should create pipe', () => {
        expect(pipe).toBeDefined();
    });
});
