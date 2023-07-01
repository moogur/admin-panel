import { defineComponent } from 'vue';

import { SvgIcon } from '@shared/components';
import { errorNotification, successNotification } from '@shared/utils';

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  setup(properties) {
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(properties.text);
        successNotification('Copied');
      } catch {
        errorNotification('Cannot copy');
      }
    };

    return {
      copy,
    };
  },
});
