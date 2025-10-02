import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HttpGetClient } from '../data/http';
import { RemoteCategoryList, RemoteProductList } from '../data/usecases';
import { AxiosHttpClient } from '../infra';
import { HomeScreen } from '../presentation/screens';
import { queryClient } from '../presentation/shared/react-query';

const getApiUrl = (): string => {
  return process.env.API_URL as string;
};

const makeAxiosHttpClient = (): HttpGetClient => {
  return new AxiosHttpClient();
};

const makeRemoteProductList = () => {
  return new RemoteProductList(getApiUrl(), makeAxiosHttpClient());
};

const makeRemoteCategoryList = () => {
  return new RemoteCategoryList(
    `${getApiUrl()}/categories`,
    makeAxiosHttpClient(),
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <HomeScreen
          productListUseCase={makeRemoteProductList()}
          categoryListUseCase={makeRemoteCategoryList()}
        />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
