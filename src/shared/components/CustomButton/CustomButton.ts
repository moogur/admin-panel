import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    variant: {
      default: 'primary',
      type: String as () => 'primary' | 'secondary' | 'info' | 'light',
    },
  },
});
