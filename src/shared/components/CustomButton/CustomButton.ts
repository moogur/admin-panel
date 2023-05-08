import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      required: true,
      type: String,
    },
    variant: {
      default: 'primary',
      type: String as () => 'primary' | 'secondary' | 'info' | 'light',
    },
  },
});
