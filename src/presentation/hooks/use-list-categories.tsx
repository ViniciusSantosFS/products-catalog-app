import { useQuery } from '@tanstack/react-query';
import { CategoryListUseCase } from '../../domain/usecases';
import { QueryClientKeys } from '../shared/react-query';

type Params = {
  categoryListUseCase: CategoryListUseCase;
};

const FIVE_HOURS_IN_MS = 1000 * 60 * 60 * 5;

export const useListCategories = ({ categoryListUseCase }: Params) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryClientKeys.CATEGORIES],
    queryFn: () => categoryListUseCase.execute(),
    staleTime: FIVE_HOURS_IN_MS,
  });

  return { categories, isLoading, isError };
};
