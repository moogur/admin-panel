import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      required: true,
      type: Array<{ title: string; value: unknown; type?: 'text' | 'link' }>,
    },
    title: {
      required: true,
      type: String,
    },
  },
});
