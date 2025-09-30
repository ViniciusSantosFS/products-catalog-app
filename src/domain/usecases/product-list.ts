import { Product } from '../entities';

export interface ProductListUseCase {
  execute(): Promise<Product[]>;
}
