import { faker } from '@faker-js/faker';
import { UnexpectedError } from '../../../domain/errors';
import { HttpStatusCode } from '../../http';
import { ProductsResponseData } from '../../mappers';
import {
  HttpGetClientSpy,
  mockProductInStock,
  mockProductOutOfStock,
} from '../../test';
import { RemoteProductList } from './remote-product-list';

type SutTypes = {
  sut: RemoteProductList;
  httpGetClientSpy: HttpGetClientSpy<ProductsResponseData>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<ProductsResponseData>();
  const sut = new RemoteProductList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  it('Should return a list of products on success', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = {
      statusCode: HttpStatusCode.ok,
      body: {
        products: [mockProductInStock(), mockProductOutOfStock()],
        skip: faker.number.int(),
        total: faker.number.int(),
      },
    };

    httpGetClientSpy.response = httpResult;

    const { products, skip, total } = await sut.execute();
    const [productInStock, productOutOfStock] = httpResult.body.products;

    expect(products).toEqual([
      { ...productInStock, hasInStock: true },
      { ...productOutOfStock, hasInStock: false },
    ]);

    expect(skip).toBe(httpResult.body.skip + httpResult.body.products.length);
    expect(total).toBe(httpResult.body.total);
  });

  it('Should return an empty list if the HttpGetClient return an status 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: undefined,
    };

    const { products, skip, total } = await sut.execute();

    expect(products).toEqual([]);
    expect(skip).toBe(0);
    expect(total).toBe(0);
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

  it('Should return an empty list if the HttpGetClient return the status 200 with an invalid body', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: undefined,
    };

    const { products, skip, total } = await sut.execute();
    expect(products).toEqual([]);
    expect(skip).toBe(0);
    expect(total).toBe(0);
  });
});
