import { HTTPError } from '@api/baseApi';

export interface BaseStore<T> {
  data: T | null;
  loading: boolean;
  loaded: boolean;
  error: HTTPError | null;
  abortController: AbortController | null;
}
