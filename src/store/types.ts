import { HTTPError } from 'ky';

export interface BaseStore<T> {
  data: T | null;
  loading: boolean;
  loaded: boolean;
  error: HTTPError | null;
}
