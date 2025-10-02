import { Product, ProductPages } from '../../domain/entities';

export type ProductsListResponseData = {
  products: ApiProductData[];
  skip: number;
  total: number;
};

export type ApiProductData = {
  id: number;
  title: string;
  price: string;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  category: string;
  description: string;
};

export class ProductListMapper {
  static mapProductToDomain(product: ApiProductData): Product {
    return {
      ...product,
      hasInStock: product.stock > 0,
    };
  }

  static mapToDomain(
    productsList: ProductsListResponseData,
    currentPage: number,
  ): ProductPages {
    const lastProductReceived =
      productsList.products[productsList.products.length - 1];
    const hasNextPage = lastProductReceived
      ? productsList.products[productsList.products.length - 1].id <
        productsList.total
      : false;

    return {
      products: productsList.products.map(ProductListMapper.mapProductToDomain),
      page: hasNextPage ? currentPage + 1 : currentPage,
      hasNextPage,
    };
  }
}
