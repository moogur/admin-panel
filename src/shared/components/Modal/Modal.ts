import { defineComponent } from 'vue';

import { CloseIcon } from '../Icons';

export default defineComponent({
  components: {
    CloseIcon,
  },
  props: {
    onClose: {
      required: true,
      type: Function,
    },
    title: {
      default: '',
      type: String,
    },
    onOk: {
      default: () => {},
      type: Function,
    },
    formName: {
      default: null,
      type: String,
    },
  },
  setup(properties) {
    return {
      close: properties.onClose,
      ok: properties.onOk,
      titleModal: properties.title,
      form: properties.formName,
    };
  },
});
