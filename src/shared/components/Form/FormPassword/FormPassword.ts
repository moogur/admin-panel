import { defineComponent, ref } from 'vue';

import { SvgIcon } from '@shared/components';

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    errorMessage: {
      default: '',
      type: String as () => string | undefined,
    },
    placeholder: {
      default: '',
      type: String,
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
  setup() {
    const type = ref<'text' | 'password'>('password');

    return { type };
  },
});
