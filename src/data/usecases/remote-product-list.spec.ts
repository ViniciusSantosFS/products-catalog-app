import { faker } from '@faker-js/faker';
import { Product } from '../../domain/entities';
import { UnexpectedError } from '../../domain/errors';
import { mockProductList } from '../../domain/test';
import { HttpStatusCode } from '../http';
import { HttpGetClientSpy } from '../test';
import { RemoteProductList } from './remote-product-list';

type SutTypes = {
  sut: RemoteProductList;
  httpGetClientSpy: HttpGetClientSpy<Product[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<Product[]>();
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
      body: mockProductList(),
    };

    httpGetClientSpy.response = httpResult;

    const products = await sut.execute();
    const expected = httpResult.body;

    expect(products).toEqual(expected);
  });

  it('Should throw an UnexpectedError if the HttpGetClient return an status greater or equal to 400', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
