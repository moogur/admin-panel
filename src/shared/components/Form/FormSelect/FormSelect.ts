import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array<{ label: string; value: string }>,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      required: true,
      type: String,
    },
  },
});
