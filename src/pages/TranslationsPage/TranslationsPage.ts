import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, reactive, watch } from 'vue';

import { Tabs, Loader, MainError, FormRadio, FormInput } from '@shared/components';
import { FrontendServices } from '@shared/types';
import { TranslationFilterShowEnum, useGetLanguageDictionaryStore, useTranslationStore } from '@store';

import { Service } from './Service';
import { tabs } from './TranslationsPageConstants';

export default defineComponent({
  components: {
    MainError,
    Loader,
    Tabs,
    Service,
    FormRadio,
    FormInput,
  },
  setup() {
    const getLanguageDictionaryStore = useGetLanguageDictionaryStore();
    const { loading, loaded, error } = storeToRefs(getLanguageDictionaryStore);
    const translationStore = useTranslationStore();

    const formData = reactive({ type: translationStore.filter.showType, search: translationStore.filter.searchString });
    translationStore.service = tabs[0]?.key ?? null;

    onMounted(() => {
      getLanguageDictionaryStore.thunk();
    });

    watch(formData, (formValues) => {
      translationStore.filter = { showType: formValues.type, searchString: formValues.search };
    });

    const updateServiceKey = (key: FrontendServices) => {
      translationStore.service = key;
    };

    return {
      tabs,
      loading,
      loaded,
      error,
      formData,
      updateServiceKey,
      TranslationFilterShowEnum,
    };
  },
});
