import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable, MainError, Loader } from '@shared/components';
import { getAggStatesError, getAggStatesLoaded, getAggStatesLoading } from '@shared/utils';
import { useGetServicesVersionsStore, useGetServicesIpsStore } from '@store';

import { baseDataSource, columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
    MainError,
    Loader,
  },
  setup() {
    const getServicesVersionsStore = useGetServicesVersionsStore();
    const servicesVersionsStoreReference = storeToRefs(getServicesVersionsStore);
    const getServicesIpsStore = useGetServicesIpsStore();
    const servicesIpsStoreReference = storeToRefs(getServicesIpsStore);

    onMounted(() => {
      getServicesVersionsStore.thunk();
      getServicesIpsStore.thunk();
    });
    onUnmounted(() => {
      getServicesVersionsStore.abortController?.abort();
      getServicesIpsStore.abortController?.abort();
    });

    const dataSource = computed(() => {
      if (!servicesVersionsStoreReference.data.value || !servicesIpsStoreReference.data.value) return [];

      return baseDataSource.map(({ dataIndex, ...other }) => ({
        ...other,
        version: servicesVersionsStoreReference.data.value?.[dataIndex],
        ip: servicesIpsStoreReference.data.value?.[dataIndex],
      }));
    });

    const loading = computed(() => getAggStatesLoading(servicesVersionsStoreReference, servicesIpsStoreReference));

    const loaded = computed(() => getAggStatesLoaded(servicesVersionsStoreReference, servicesIpsStoreReference));

    const error = computed(() => getAggStatesError(servicesVersionsStoreReference, servicesIpsStoreReference));

    return {
      dataSource,
      columns,
      loading,
      loaded,
      error,
    };
  },
});
