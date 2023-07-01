import { VNode } from 'vue';

export interface ColumnType<T> {
  dataIndex?: keyof T;
  title: string;
  customRender?: (value: any, record: T) => VNode;
}

export type ColumnsType<T> = Array<ColumnType<T>>;
