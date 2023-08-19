import { ResponseType } from './response';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ConvertResponseType = 'json' | 'blob';

type BaseQueryParametersConfig<Query = undefined> = Query extends undefined ? object : { queryParameters: Query };

type BaseUrlParametersConfig<Url = undefined> = Url extends undefined ? object : { urlParameters: Url };

export type RequestConfig<Body = undefined, Url = undefined, Query = undefined> = Body extends undefined
  ? BaseUrlParametersConfig<Url> & BaseQueryParametersConfig<Query>
  : {
      body: Body;
    } & BaseUrlParametersConfig<Url> &
      BaseQueryParametersConfig<Query>;

export type RequestConfigWithAbortSignal<Body = undefined, Url = undefined, Query = undefined> = {
  signal: AbortSignal;
  headers?: Record<string, string>;
} & RequestConfig<Body, Url, Query>;

export type RequestConfigForProperties<Body = undefined, Url = undefined, Query = undefined> = Omit<
  RequestConfigWithAbortSignal<Body, Url, Query>,
  'headers'
>;

export type AdvancedRequestConfig<Body = undefined, Url = undefined, Query = undefined> = RequestConfigWithAbortSignal<
  Body,
  Url,
  Query
> & {
  method: RequestMethod;
  url: string;
  convertResponse?: ConvertResponseType;
};

export interface ConfigForFetch {
  baseUrl: string;
  responseType: ResponseType;
  headers?: Record<string, string>;
  convertResponse: ConvertResponseType;
}
