import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    errorMessage: {
      default: '',
      type: String as () => string | undefined,
    },
    placeholder: {
      default: '',
      type: String,
    },
    type: {
      required: true,
      type: String as () => 'text' | 'password',
    },
    modelValue: {
      required: true,
      type: String,
    },
    autocomplete: {
      default: 'on',
      type: String as () => 'off' | 'on' | 'new-password',
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    showLabel: {
      default: true,
      type: Boolean,
    },
    required: {
      default: false,
      type: Boolean,
    },
  },
});
