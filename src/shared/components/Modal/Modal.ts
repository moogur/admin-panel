import { defineComponent } from 'vue';

import { SvgIcon } from '../SvgIcon';

export default defineComponent({
  components: {
    SvgIcon,
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
  },
  emits: ['close', 'ok'],
  setup(properties) {
    return {
      titleModal: properties.title,
      form: properties.formName,
    };
  },
});
