import { faker } from '@faker-js/faker';
import { ApiProductData } from '../mappers';

export const mockProduct = (productId: number): ApiProductData => ({
  id: productId,
  title: faker.lorem.sentence(),
  price: faker.commerce.price(),
  rating: faker.number.int(),
  brand: faker.commerce.productAdjective(),
  thumbnail: faker.image.url(),
  description: faker.lorem.sentence(),
  category: faker.commerce.department(),
  stock: faker.number.int(),
});

export const mockProductInStock = (productId = 1): ApiProductData => ({
  ...mockProduct(productId),
  stock: faker.number.int({ min: 1, max: 100 }),
});

export const mockProductOutOfStock = (productId = 1): ApiProductData => ({
  ...mockProduct(productId),
  stock: 0,
});
