import { defineComponent } from 'vue';

import { ListItemType } from '@shared/types';

export default defineComponent({
  props: {
    data: {
      required: true,
      type: Array<ListItemType>,
    },
    title: {
      required: true,
      type: String,
    },
  },
});
