import { faker } from '@faker-js/faker';
import { ApiProductData } from '../mappers';

export const mockProduct = (): ApiProductData => ({
  title: faker.lorem.sentence(),
  price: faker.commerce.price(),
  rating: faker.number.int(),
  brand: faker.commerce.productAdjective(),
  thumbnail: faker.image.url(),
  description: faker.lorem.sentence(),
  category: faker.commerce.department(),
  stock: faker.number.int(),
});

export const mockProductInStock = (): ApiProductData => ({
  ...mockProduct(),
  stock: faker.number.int({ min: 1, max: 100 }),
});

export const mockProductOutOfStock = (): ApiProductData => ({
  ...mockProduct(),
  stock: 0,
});
