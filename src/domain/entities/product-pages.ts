import { Product } from './product';

export type ProductPages = {
  products: Product[];
  skip: number;
  total: number;
};
