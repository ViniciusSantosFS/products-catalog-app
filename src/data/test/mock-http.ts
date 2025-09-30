import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
  HttpStatusCode,
} from '../http';

export class HttpGetClientSpy<R = unknown> implements HttpGetClient {
  url: string = '';
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
    body: {} as R,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
