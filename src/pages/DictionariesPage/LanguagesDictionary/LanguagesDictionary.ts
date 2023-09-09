import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MainError, Loader, CustomTable } from '@shared/components';
import { useGetLanguageDictionaryStore } from '@store';

import { AddModal } from './AddModal';
import { columns } from './LanguagesDictionaryConstants';

export default defineComponent({
  components: {
    MainError,
    Loader,
    CustomTable,
    AddModal,
  },
  setup() {
    const getLanguageDictionaryStore = useGetLanguageDictionaryStore();
    const { loading, loaded, error, data } = storeToRefs(getLanguageDictionaryStore);

    onMounted(() => {
      getLanguageDictionaryStore.thunk();
    });
    onUnmounted(() => {
      getLanguageDictionaryStore.abortController?.abort();
    });

    return {
      data,
      loading,
      loaded,
      error,
      columns,
    };
  },
});
