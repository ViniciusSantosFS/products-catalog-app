import { Category } from '../entities';

export interface CategoryListUseCase {
  execute(): Promise<Category[]>;
}
