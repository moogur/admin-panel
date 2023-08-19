import { HTTPError } from '@api/baseApi';

export interface Store<T> {
  data: T | null;
  loading: boolean;
  loaded: boolean;
  error: HTTPError | null;
  abortController: AbortController | null;
}

export type BaseStore<T, K extends object | undefined = undefined> = K extends undefined ? Store<T> : Store<T> & K;
