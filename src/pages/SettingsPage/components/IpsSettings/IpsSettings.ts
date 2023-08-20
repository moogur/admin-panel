import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';

import { Copy, MainError, Loader } from '@shared/components';
import { getAggStatesError, getAggStatesLoaded, getAggStatesLoading } from '@shared/utils';
import { useGetClientIpStore, useGetServicesIpsStore } from '@store';

export default defineComponent({
  components: {
    Copy,
    MainError,
    Loader,
  },
  setup() {
    const getClientIpStore = useGetClientIpStore();
    const clientIpStoreReference = storeToRefs(getClientIpStore);
    const getServicesIpsStore = useGetServicesIpsStore();
    const servicesIpsStoreReference = storeToRefs(getServicesIpsStore);

    onMounted(() => {
      getClientIpStore.thunk();
      getServicesIpsStore.thunk();
    });
    onUnmounted(() => {
      getClientIpStore.abortController?.abort();
      getServicesIpsStore.abortController?.abort();
    });

    const loading = computed(() => getAggStatesLoading(clientIpStoreReference, servicesIpsStoreReference));

    const loaded = computed(() => getAggStatesLoaded(clientIpStoreReference, servicesIpsStoreReference));

    const error = computed(() => getAggStatesError(clientIpStoreReference, servicesIpsStoreReference));

    return {
      clientIp: clientIpStoreReference.data,
      servicesIps: servicesIpsStoreReference.data,
      loading,
      loaded,
      error,
    };
  },
});
