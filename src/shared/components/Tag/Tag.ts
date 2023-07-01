import { defineComponent } from 'vue';

import { TagType } from './TagTypes';

export default defineComponent({
  props: {
    variant: {
      required: true,
      type: String as () => TagType,
    },
  },
});
