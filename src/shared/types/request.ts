import { ResponseType } from './response';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ConvertResponseType = 'json' | 'blob';

export type RequestConfig<T> = T extends undefined
  ? {
      headers?: Record<string, string>;
    }
  : {
      body?: T;
      headers?: Record<string, string>;
    };

export type RequestConfigWithAbortSignal<T = undefined> = {
  signal?: AbortSignal;
} & RequestConfig<T>;

export type RequestConfigForProperties<T = undefined> = Omit<RequestConfigWithAbortSignal<T>, 'headers'>;

export type AdvancedRequestConfig<T> = RequestConfigWithAbortSignal<T> & {
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
