import { HttpResponse } from './index';

export type HttpGetParams<H = unknown> = {
  url: string;
  headers?: H;
};

export interface HttpGetClient<R = unknown> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>;
}
