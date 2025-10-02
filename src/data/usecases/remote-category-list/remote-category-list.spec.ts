import { faker } from '@faker-js/faker';
import { UnexpectedError } from '../../../domain/errors';
import { HttpStatusCode } from '../../http';
import { CategoryResponseData } from '../../mappers/category-mapper';
import { HttpGetClientSpy } from '../../test';
import { mockCategoryList } from '../../test/';
import { RemoteCategoryList } from './remote-category-list';

type SutTypes = {
  sut: RemoteCategoryList;
  httpGetClientSpy: HttpGetClientSpy<CategoryResponseData[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<CategoryResponseData[]>();
  const sut = new RemoteCategoryList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  it('Should return a list of categories on success', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = {
      statusCode: HttpStatusCode.ok,
      body: mockCategoryList(),
    };

    httpGetClientSpy.response = httpResult;

    const categories = await sut.execute();
    const expected = httpResult.body.map((item) => ({
      id: item.slug,
      name: item.name,
    }));

    expect(categories).toEqual(expected);
  });

  it('Should return an empty list if the HttpGetClient return the status 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: undefined,
    };

    const categories = await sut.execute();
    expect(categories).toEqual([]);
  });

  it('Should throw an UnexpectedError if the HttpGetClient return the status 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw an UnexpectedError if the HttpGetClient return the status 400', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw an UnexpectedError if the HttpGetClient return the status 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
