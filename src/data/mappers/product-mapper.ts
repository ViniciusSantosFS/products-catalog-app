import { Product } from '../../domain/entities';

export interface ProductResponseData {
  title: string;
  price: string;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  category: string;
  description: string;
}

export class ProductMapper {
  static mapToDomain(product: ProductResponseData): Product {
    return {
      ...product,
      hasInStock: product.stock > 0,
    };
  }
}
