export interface OnlyId {
  id: string;
}

export interface BasePagination {
  pageSize: number;
  pageNumber: number;
}

export interface Pagination extends BasePagination {
  pageCount: number;
  total: number;
}
