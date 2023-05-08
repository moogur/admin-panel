import { ApiError } from '@api/baseApi';

export interface BaseStore<T> {
  data: T | null;
  loading: boolean;
  loaded: boolean;
  error: ApiError | null;
  abortController: AbortController | null;
}
