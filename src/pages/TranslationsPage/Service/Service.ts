import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, computed, onUnmounted } from 'vue';

import { Tabs, Loader, MainError } from '@shared/components';
import { useGetDefaultMessagesStore, useGetLanguageDictionaryStore, useTranslationStore } from '@store';

import { Translation } from './Translation';

export default defineComponent({
  components: {
    MainError,
    Loader,
    Tabs,
    Translation,
  },
  setup() {
    const getLanguageDictionaryStore = useGetLanguageDictionaryStore();
    const getDefaultMessagesStore = useGetDefaultMessagesStore();
    const { loading, loaded, error } = storeToRefs(getDefaultMessagesStore);
    const translationStore = useTranslationStore();

    translationStore.code = getLanguageDictionaryStore.data?.[0]?.code ?? null;
    translationStore.nameEn = getLanguageDictionaryStore.data?.[0]?.nameEn ?? null;

    onMounted(() => {
      if (translationStore.service) getDefaultMessagesStore.thunk({ service: translationStore.service });
    });
    onUnmounted(() => {
      getDefaultMessagesStore.abortController?.abort();
      getDefaultMessagesStore.$reset();
    });

    const tabs = computed(
      () =>
        getLanguageDictionaryStore.data?.map((item) => ({
          key: item.code,
          title: item.code,
          component: Translation,
        })) ?? [],
    );

    const updateCodeKey = (key: string) => {
      translationStore.code = key;
    };

    return {
      tabs,
      loading,
      loaded,
      error,
      updateCodeKey,
      service: translationStore.service,
    };
  },
});
