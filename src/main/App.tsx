import { QueryClientProvider } from '@tanstack/react-query';
import { HttpGetClient } from '../data/http';
import { RemoteCategoryList, RemoteProductList } from '../data/usecases';
import { AxiosHttpClient } from '../infra';
import { HomeScreen } from '../presentation/screens';
import { queryClient } from '../presentation/shared/react-query';

const makeAxiosHttpClient = (): HttpGetClient => {
  return new AxiosHttpClient();
};

export default function App() {
  const apiUrl = 'https://dummyjson.com/products';

  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen
        productListUseCase={
          new RemoteProductList(apiUrl, makeAxiosHttpClient())
        }
        categoryListUseCase={
          new RemoteCategoryList(`${apiUrl}/categories`, makeAxiosHttpClient())
        }
      />
    </QueryClientProvider>
  );
}
