import { VNode } from 'vue';

export type SortOrder = 'descend' | 'ascend' | null;

export interface Sort<SortKey extends string> {
  key: SortKey;
  sortOrder: SortOrder;
}

export interface ColumnType<Data> {
  key: string;
  dataIndex?: keyof Data;
  title: string;
  needSort?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRender?: (value: any, record: Data) => VNode;
  tdStyle?: string;
  thStyle?: string;
}

export type ColumnsType<Data> = Array<ColumnType<Data>>;

export interface TablePaginationConfig {
  pageNumber: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface TableChange<SortKey extends string> {
  action: 'sorter' | 'pagination' | null;
  pagination: TablePaginationConfig;
  sorter: Sort<SortKey>;
}
