import { defineComponent } from 'vue';

import { SvgIcon } from '@shared/components';

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    message: {
      default: 'Sorry, the server is wrong.',
      type: String,
    },
  },
});
