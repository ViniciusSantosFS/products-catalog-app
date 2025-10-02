import { HttpResponse } from './index';

export type HttpGetParams<Headers = unknown> = {
  url: string;
  headers?: Headers;
};

export interface HttpGetClient<ResponseBody = unknown> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseBody>>;
}
