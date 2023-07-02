import { defineComponent } from 'vue';

import { CustomButton } from '../CustomButton';
import { SvgIcon } from '../SvgIcon';

export default defineComponent({
  components: {
    SvgIcon,
    CustomButton,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    formName: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close', 'ok'],
});
