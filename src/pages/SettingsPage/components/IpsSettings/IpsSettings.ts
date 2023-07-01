import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';

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

    return {
      clientIp,
      servicesIps,
    };
  },
});
