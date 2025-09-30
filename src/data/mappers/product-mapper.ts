import { Product } from '../../domain/entities';

export type ProductsResponseData = {
  products: ApiProductData[];
  skip: number;
  total: number;
};

export type ApiProductData = {
  title: string;
  price: string;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  category: string;
  description: string;
};

export class ProductMapper {
  static mapToDomain(product: ApiProductData): Product {
    return {
      ...product,
      hasInStock: product.stock > 0,
    };
  }
}
