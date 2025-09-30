import { Product } from '../../domain/entities';
import { UnexpectedError } from '../../domain/errors';
import { ProductListUseCase } from '../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../http';

export class RemoteProductList implements ProductListUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async execute(): Promise<Product[]> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    const products = (response.body as unknown[]) ?? [];

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return products.map((product) => product as Product);
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
