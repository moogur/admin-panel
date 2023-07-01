import { defineComponent } from 'vue';

import { ColumnType } from '@shared/types';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      required: true,
      type: Array<unknown>,
    },
    columns: {
      required: true,
      type: Array<ColumnType<unknown>>,
    },
  },
});
