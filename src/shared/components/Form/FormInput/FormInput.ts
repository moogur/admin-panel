import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    errorMessage: {
      default: '',
      type: String as () => string | undefined,
    },
    placeholder: {
      default: undefined,
      type: String as () => string | undefined,
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
    labelWidth: {
      default: 100,
      type: Number,
    },
    labelPlacement: {
      default: 'left',
      type: String as () => 'left' | 'top',
    },
    required: {
      default: false,
      type: Boolean,
    },
    showPlaceholder: {
      default: true,
      type: Boolean,
    },
  },
});
