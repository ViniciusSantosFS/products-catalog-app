import { faker } from '@faker-js/faker';
import { CategoryResponseData } from '../mappers/category-mapper';

export const mockCategory = (): CategoryResponseData => ({
  slug: faker.lorem.sentence(),
  name: faker.commerce.productAdjective(),
});

export const mockCategoryList = (): CategoryResponseData[] => [
  mockCategory(),
  mockCategory(),
  mockCategory(),
];
