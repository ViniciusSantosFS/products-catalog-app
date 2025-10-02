import { ProductPages } from '../entities/product-pages';

export interface ProductListUseCase {
  execute(currentPage: number): Promise<ProductPages>;
}
