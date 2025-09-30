import { faker } from '@faker-js/faker';
import { ProductResponseData } from '../mappers';

export const mockProduct = (): ProductResponseData => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  rating: faker.number.int(),
  brand: faker.commerce.productAdjective(),
  thumbnail: faker.image.url(),
  description: faker.lorem.sentence(),
  category: faker.commerce.department(),
  stock: faker.number.int(),
});

export const mockProductInStock = (): ProductResponseData => ({
  ...mockProduct(),
  stock: faker.number.int(100),
});

export const mockProductOutOfStock = (): ProductResponseData => ({
  ...mockProduct(),
  stock: 0,
});

export const mockProductList = (): ProductResponseData[] => [
  mockProduct(),
  mockProduct(),
  mockProduct(),
];
