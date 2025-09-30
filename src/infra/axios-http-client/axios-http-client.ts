import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { HttpGetClient, HttpGetParams, HttpResponse } from '../../data/http';

export class AxiosHttpClient implements HttpGetClient {
  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      const headers: AxiosHeaders = params.headers as AxiosHeaders;
      axiosResponse = await axios.get(params.url, { headers });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
