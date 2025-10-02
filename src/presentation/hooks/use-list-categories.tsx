import { useQuery } from '@tanstack/react-query';
import { CategoryListUseCase } from '../../domain/usecases';
import { QueryClientKeys } from '../shared/react-query';

type Params = {
  categoryListUseCase: CategoryListUseCase;
};

export const useListCategories = ({ categoryListUseCase }: Params) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryClientKeys.CATEGORIES],
    queryFn: () => categoryListUseCase.execute(),
    staleTime: Infinity,
  });

  return { categories, isLoading, isError };
};
