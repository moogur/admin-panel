import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { Copy } from '@shared/components';
import { getClientIpThunk, useGetClientIpStore } from '@store';

export default defineComponent({
  components: {
    Copy,
  },
  setup() {
    const getClientIpStore = useGetClientIpStore();
    const { data } = storeToRefs(getClientIpStore);

    onMounted(getClientIpThunk);
    onUnmounted(() => getClientIpStore.$reset());

    return {
      data,
    };
  },
});
