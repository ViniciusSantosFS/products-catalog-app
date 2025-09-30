import { Category } from '../../../domain/entities';
import { UnexpectedError } from '../../../domain/errors';
import { CategoryListUseCase } from '../../../domain/usecases';
import { HttpGetClient, HttpStatusCode } from '../../http';
import {
  CategoryMapper,
  CategoryResponseData,
} from '../../mappers/category-mapper';

export class RemoteCategoryList implements CategoryListUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient,
  ) {}

  async execute(): Promise<Category[]> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    const categories = (response.body as CategoryResponseData[]) ?? [];

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return categories.map(CategoryMapper.mapToDomain);
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
