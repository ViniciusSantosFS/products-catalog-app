import { useEffect, useState } from 'react';
import { ProductListUseCase } from '../../domain/usecases';

type Params = {
  productListUseCase: ProductListUseCase;
};
export const useListProducts = ({ productListUseCase }: Params) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    productListUseCase.execute().then((products) => {
      setProducts(products);
    });
  }, [productListUseCase]);

  return { products };
};
