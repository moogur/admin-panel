import { ResponseType } from './response';

export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type RequestConfig<T> = T extends undefined
  ? {
      headers?: Record<string, string>;
    }
  : {
      body?: T;
      headers?: Record<string, string>;
    };

export type RequestConfigWithAbortSignal<T> = {
  signal?: AbortSignal;
} & RequestConfig<T>;

export type AdvancedRequestConfig<T> = RequestConfigWithAbortSignal<T> & {
  method: RequestMethod;
  url: string;
};

export interface ConfigForFetch {
  baseUrl: string;
  responseType: ResponseType;
  headers?: Record<string, string>;
}
