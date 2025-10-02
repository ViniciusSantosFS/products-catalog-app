export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<ResponseBody = unknown> = {
  statusCode: HttpStatusCode;
  body?: ResponseBody;
};
