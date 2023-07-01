import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { Copy } from '@shared/components';
import { getClientIpThunk, useGetClientIpStore, useGetServicesIpsStore } from '@store';

export default defineComponent({
  components: {
    Copy,
  },
  setup() {
    const getClientIpStore = useGetClientIpStore();
    const getServicesIpsStore = useGetServicesIpsStore();
    const { data: clientIp } = storeToRefs(getClientIpStore);
    const { data: servicesIps } = storeToRefs(getServicesIpsStore);

    onMounted(getClientIpThunk);
    onUnmounted(() => {
      getClientIpStore.abortController?.abort();
    });

    return {
      clientIp,
      servicesIps,
    };
  },
});
