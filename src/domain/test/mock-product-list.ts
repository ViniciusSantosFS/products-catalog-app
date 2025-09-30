import { faker } from '@faker-js/faker';
import { Product } from '../entities';

export const mockProduct = (): Product => ({
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  rating: faker.number.int(),
  brand: faker.commerce.productAdjective(),
  thumbnail: faker.image.url(),
  description: faker.lorem.sentence(),
  hasInStock: faker.datatype.boolean(),
});

export const mockProductList = (): Product[] => [
  mockProduct(),
  mockProduct(),
  mockProduct(),
];
