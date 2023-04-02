import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    msg: { type: String, required: true },
  },

  setup() {
    const count = ref(0);

    return { count };
  },
});
