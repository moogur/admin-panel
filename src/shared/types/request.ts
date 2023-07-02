import { ResponseType } from './response';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ConvertResponseType = 'json' | 'blob';

type BaseQueryParametersConfig<Query> = Query extends undefined ? object : { queryParameters?: Query };

type BaseUrlParametersConfig<Url> = Url extends undefined ? object : { urlParameters?: Url };

export type RequestConfig<Body, Url, Query> = Body extends undefined
  ? {
      headers?: Record<string, string>;
    } & BaseUrlParametersConfig<Url> &
      BaseQueryParametersConfig<Query>
  : {
      body?: Body;
      headers?: Record<string, string>;
    } & BaseUrlParametersConfig<Url> &
      BaseQueryParametersConfig<Query>;

export type RequestConfigWithAbortSignal<Body = undefined, Url = undefined, Query = undefined> = {
  signal?: AbortSignal;
} & RequestConfig<Body, Url, Query>;

export type RequestConfigForProperties<Body = undefined, Url = undefined, Query = undefined> = Omit<
  RequestConfigWithAbortSignal<Body, Url, Query>,
  'headers'
>;

export type AdvancedRequestConfig<Body, Url, Query> = RequestConfigWithAbortSignal<Body, Url, Query> & {
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
