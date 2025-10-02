import { ProductPages } from '../../../domain/entities';
import { UnexpectedError } from '../../../domain/errors';
import { ProductListUseCase } from '../../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../../http';
import { ProductListMapper, ProductsListResponseData } from '../../mappers';

export class RemoteProductList implements ProductListUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async execute(currentPage: number): Promise<ProductPages> {
    const limit = 30;
    const skip = currentPage * limit;

    const response = await this.httpClient.get({
      url: `${this.url}?limit=${limit}&skip=${skip}`,
    });
    const data = response.body ?? this.getEmptyProductPages(currentPage);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return ProductListMapper.mapToDomain(
          data as ProductsListResponseData,
          currentPage,
        );
      case HttpStatusCode.noContent:
        return this.getEmptyProductPages(currentPage);
      default:
        throw new UnexpectedError();
    }
  }

  private getEmptyProductPages(page: number): ProductPages {
    return {
      products: [],
      hasNextPage: false,
      page,
    };
  }
}
