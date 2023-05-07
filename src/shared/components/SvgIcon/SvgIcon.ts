import { defineComponent } from 'vue';

import { iconsContent } from './constants';

export default defineComponent({
  props: {
    icon: {
      required: true,
      type: String as () => keyof typeof iconsContent,
    },
  },
  setup(properties) {
    return {
      data: iconsContent[properties.icon],
    };
  },
});
