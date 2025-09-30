import { ProductPages } from '../entities/product-pages';

export interface ProductListUseCase {
  execute(): Promise<ProductPages>;
  execute(skip: number): Promise<ProductPages>;
}
