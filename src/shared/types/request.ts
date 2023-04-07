import { KyInstance } from 'ky/distribution/types/ky';

export interface RequestData<T> {
  data?: T;
  abortSignal?: AbortSignal;
}

export interface RequestConfig<T> extends RequestData<T> {
  headers?: Record<string, string>;
}

export interface AdvancedRequestConfig<T> extends RequestConfig<T> {
  method: keyof Pick<KyInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  url: string;
}
