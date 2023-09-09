import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';

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

    return {
      data,
      loading,
      loaded,
      error,
      columns,
    };
  },
});
