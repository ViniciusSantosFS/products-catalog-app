import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
  HttpStatusCode,
} from '../http';

export class HttpGetClientSpy<Body = unknown> implements HttpGetClient {
  url: string = '';
  headers?: any;
  response: HttpResponse<Body> = {
    statusCode: HttpStatusCode.ok,
    body: {} as Body,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<Body>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
