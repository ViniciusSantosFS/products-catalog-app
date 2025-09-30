import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import { mockProductList } from '../../../data/test';
import { Product } from '../../../domain/entities';
import { ProductListUseCase } from '../../../domain/usecases';
import { HomeScreen } from './home';

class productListUseCaseSpy implements ProductListUseCase {
  callsCount = 0;
  products = mockProductList();

  async execute(): Promise<Product[]> {
    this.callsCount++;
    return Promise.resolve(
      this.products.map((product) => ({ ...product, hasInStock: true })),
    );
  }
}

const makeSut = () => {
  const listProductsSpy = new productListUseCaseSpy();
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <HomeScreen productListUseCase={listProductsSpy} />
    </QueryClientProvider>,
  );
  return {
    listProductsSpy,
  };
};

describe('HomeScreen', () => {
  it('Should display the title, price and thumbnail of the products', async () => {
    const { listProductsSpy } = makeSut();
    const [product] = listProductsSpy.products;

    await waitFor(() => {
      expect(screen.getByText(product.title)).toBeTruthy();
      expect(screen.getByText(product.price)).toBeTruthy();
    });
  });
});
