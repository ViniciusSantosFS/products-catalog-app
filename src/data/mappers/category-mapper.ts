import { Category } from '../../domain/entities';

export interface CategoryResponseData {
  slug: string;
  name: string;
}

export class CategoryMapper {
  static mapToDomain(category: CategoryResponseData): Category {
    return {
      id: category.slug,
      name: category.name,
    };
  }
}
