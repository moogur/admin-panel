import { KyInstance } from 'ky/distribution/types/ky';

export type RequestConfig<T> = T extends undefined
  ? {
      headers?: Record<string, string>;
    }
  : {
      data?: T;
      headers?: Record<string, string>;
    };

export type RequestConfigWithAbortSignal<T> = {
  abortSignal?: AbortSignal;
} & RequestConfig<T>;

export type AdvancedRequestConfig<T> = RequestConfigWithAbortSignal<T> & {
  method: keyof Pick<KyInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  url: string;
};
