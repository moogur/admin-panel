import { DefineComponent } from 'vue';

export interface Tab {
  key: string;
  title: string;
  component: DefineComponent<
    object,
    object,
    object,
    {},
    {},
    object,
    object,
    {},
    string,
    object,
    object,
    object,
    object
  >;
}
