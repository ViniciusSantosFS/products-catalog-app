import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductPages } from '../../domain/entities';
import { ProductListUseCase } from '../../domain/usecases';
import { QueryClientKeys } from '../shared/react-query';

type Params = {
  productListUseCase: ProductListUseCase;
};
export const useListProducts = ({ productListUseCase }: Params) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QueryClientKeys.PRODUCTS],
      getNextPageParam: (lastPage: ProductPages) => {
        if (!lastPage.hasNextPage) return undefined;
        return lastPage.page;
      },
      queryFn: ({ pageParam }) => productListUseCase.execute(pageParam),
      initialPageParam: 0,
    });

  return {
    products: data?.pages.flatMap(({ products }) => products),
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};
