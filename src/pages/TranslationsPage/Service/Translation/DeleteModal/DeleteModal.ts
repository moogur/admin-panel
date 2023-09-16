import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, ref } from 'vue';

import { SvgIcon, Modal } from '@shared/components';
import { deleteTranslationThunk, useDeleteTranslationStore, useTranslationStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['onSuccess'],
  setup(_, { emit }) {
    const deleteTranslationStore = useDeleteTranslationStore();
    const { loading } = storeToRefs(deleteTranslationStore);
    const translationStore = useTranslationStore();
    const showModal = ref(false);

    onUnmounted(() => {
      deleteTranslationStore.abortController?.abort();
      deleteTranslationStore.$reset();
    });

    const deleteTranslation = () => {
      if (translationStore.code && translationStore.service) {
        deleteTranslationThunk({ code: translationStore.code, service: translationStore.service }, () => {
          emit('onSuccess');
          showModal.value = false;
        });
      }
    };

    return {
      loading,
      showModal,
      deleteTranslation,
      translationStore,
    };
  },
});
