import { ProductPages } from '../../../domain/entities';
import { UnexpectedError } from '../../../domain/errors';
import { ProductListUseCase } from '../../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../../http';
import { ProductMapper, ProductsResponseData } from '../../mappers';

export class RemoteProductList implements ProductListUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async execute(skip?: number): Promise<ProductPages> {
    const response = await this.httpClient.get({
      url: `${this.url}?limit=30&skip=${skip}`,
    });
    const data =
      (response.body as ProductsResponseData) ?? this.getEmptyProductPages();

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return {
          products: data.products.map(ProductMapper.mapToDomain),
          skip: data.skip + data.products.length,
          total: data.total,
        };
      case HttpStatusCode.noContent:
        return this.getEmptyProductPages();
      default:
        throw new UnexpectedError();
    }
  }

  private getEmptyProductPages(): ProductPages {
    return {
      products: [],
      skip: 0,
      total: 0,
    };
  }
}
