import { VNode } from 'vue';

export type SortOrder = 'descend' | 'ascend' | null;

export interface Sort<T extends string> {
  key: T;
  sortOrder: SortOrder;
}

export interface ColumnType<T> {
  key: string;
  dataIndex?: keyof T;
  title: string;
  needSort?: boolean;
  customRender?: (value: any, record: T) => VNode;
}

export type ColumnsType<T> = Array<ColumnType<T>>;

export interface TablePaginationConfig {
  pageNumber: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface TableChange<T extends string> {
  action: 'sorter' | 'pagination' | null;
  pagination: TablePaginationConfig;
  sorter: Sort<T>;
}
