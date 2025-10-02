import { Product } from './product';

export type ProductPages = {
  products: Product[];
  page: number;
  hasNextPage: boolean;
};
