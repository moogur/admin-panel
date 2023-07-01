import { ResponseType } from './response';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ConvertResponseType = 'json' | 'blob';

type BaseQueryParametersConfig<T> = T extends undefined ? object : { queryParameters?: T };

export type RequestConfig<T, K> = T extends undefined
  ? {
      headers?: Record<string, string>;
    } & BaseQueryParametersConfig<K>
  : {
      body?: T;
      headers?: Record<string, string>;
    } & BaseQueryParametersConfig<K>;

export type RequestConfigWithAbortSignal<T = undefined, K = undefined> = {
  signal?: AbortSignal;
} & RequestConfig<T, K>;

export type RequestConfigForProperties<T = undefined, K = undefined> = Omit<
  RequestConfigWithAbortSignal<T, K>,
  'headers'
>;

export type AdvancedRequestConfig<T, K> = RequestConfigWithAbortSignal<T, K> & {
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
