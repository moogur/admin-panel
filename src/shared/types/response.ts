import { Pagination } from './common';

export type ResponseType = 'json' | 'buffer' | 'text';

export interface ResponseWithPagination<T> {
  list: T[];
  pagination: Pagination;
}

export interface SuccessResult {
  result: true;
}
