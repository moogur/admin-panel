import { VNode } from 'vue';

export interface ListItemType {
  title: string;
  value?: unknown;
  customRender?: (value: unknown, title: string) => VNode;
}

export type ListItemsType = Array<ListItemType>;
