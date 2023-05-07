import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isHorizontal: {
      value: false,
      type: Boolean,
    },
  },
});
