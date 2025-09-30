import { HttpGetClient } from '../data/http';
import { RemoteProductList } from '../data/usecases/remote-product-list';
import { AxiosHttpClient } from '../infra';
import { HomeScreen } from '../presentation/screens';

const makeAxiosHttpClient = (): HttpGetClient => {
  return new AxiosHttpClient();
};

export default function App() {
  const apiUrl = 'https://dummyjson.com/products';
  return (
    <HomeScreen
      productListUseCase={new RemoteProductList(apiUrl, makeAxiosHttpClient())}
    />
  );
}
