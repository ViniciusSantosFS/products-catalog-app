import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductPages } from '../../domain/entities';
import { ProductListUseCase } from '../../domain/usecases';
import { QueryClientKeys } from '../shared/react-query';

type Params = {
  productListUseCase: ProductListUseCase;
};

export const useListProducts = ({ productListUseCase }: Params) => {
  return useInfiniteQuery({
    queryKey: [QueryClientKeys.PRODUCTS],
    getNextPageParam: (lastPage: ProductPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.page;
    },
    queryFn: ({ pageParam }) => productListUseCase.execute(pageParam),
    initialPageParam: 0,
  });
};
