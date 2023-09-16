import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      required: true,
      type: String,
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
