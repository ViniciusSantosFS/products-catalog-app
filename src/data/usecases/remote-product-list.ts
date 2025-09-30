import { Product } from '../../domain/entities';
import { UnexpectedError } from '../../domain/errors';
import { ProductListUseCase } from '../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../http';
import { ProductMapper, ProductResponseData } from '../mappers';

export class RemoteProductList implements ProductListUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async execute(): Promise<Product[]> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    const products =
      (response.body as { products: ProductResponseData[] })?.products ?? [];

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return products.map(ProductMapper.mapToDomain);
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
