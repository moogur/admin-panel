import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, ref } from 'vue';

import { LanguageDictionary } from '@api';
import { SvgIcon, Modal } from '@shared/components';
import { deleteLanguageFromDictionaryThunk, useDeleteLanguageFromDictionaryStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: Object as () => LanguageDictionary,
      required: true,
    },
  },
  setup(properties) {
    const deleteLanguageFromDictionaryStore = useDeleteLanguageFromDictionaryStore();
    const { loading } = storeToRefs(deleteLanguageFromDictionaryStore);
    const showModal = ref(false);

    onUnmounted(() => {
      deleteLanguageFromDictionaryStore.abortController?.abort();
      deleteLanguageFromDictionaryStore.$reset();
    });

    const deleteLanguage = () => {
      deleteLanguageFromDictionaryThunk(properties.code, () => (showModal.value = false));
    };

    return {
      loading,
      showModal,
      deleteLanguage,
    };
  },
});
