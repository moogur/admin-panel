import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array<{ label: string; value: string | number }>,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    defaultValue: {
      default: undefined,
      type: Object as () => string | number,
    },
  },
});
