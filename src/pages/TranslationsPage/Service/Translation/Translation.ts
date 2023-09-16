import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';

import { Loader, MainError, FormInput, CustomButton } from '@shared/components';
import {
  TranslationFilterShowEnum,
  updateLocalizationMessagesThunk,
  useGetDefaultMessagesStore,
  useGetLocalizationMessagesStore,
  useTranslationStore,
  useUpdateLocalizationMessagesStore,
} from '@store';

import { DeleteModal } from './DeleteModal';
import { prepareDataForForm } from './TranslationUtils';

export default defineComponent({
  components: {
    MainError,
    Loader,
    FormInput,
    CustomButton,
    DeleteModal,
  },
  setup() {
    const getDefaultMessagesStore = useGetDefaultMessagesStore();
    const { data: defaultData } = storeToRefs(getDefaultMessagesStore);
    const getLocalizationMessagesStore = useGetLocalizationMessagesStore();
    const { loading: getLoading, loaded, error, data: localizationData } = storeToRefs(getLocalizationMessagesStore);
    const updateLocalizationMessagesStore = useUpdateLocalizationMessagesStore();
    const { loading: updateLoading } = storeToRefs(updateLocalizationMessagesStore);
    const translationStore = useTranslationStore();

    const isDeleteDisabled = ref(true);

    const requestId = ++getLocalizationMessagesStore.requestId;

    const form = reactive({ data: prepareDataForForm(defaultData.value, null) });

    onMounted(async () => {
      getLocalizationMessagesStore.$reset();
      if (translationStore.code && translationStore.service) {
        await getLocalizationMessagesStore.thunk({ code: translationStore.code, service: translationStore.service });
      }
      form.data = prepareDataForForm(defaultData.value, getLocalizationMessagesStore.data);
      isDeleteDisabled.value = !getLocalizationMessagesStore.data;
    });

    onUnmounted(() => {
      if (getLocalizationMessagesStore.requestId !== requestId) return;
      updateLocalizationMessagesStore.abortController?.abort();
      getLocalizationMessagesStore.abortController?.abort();
      updateLocalizationMessagesStore.$reset();
      getLocalizationMessagesStore.$reset();
    });

    const onSubmit = () => {
      if (translationStore.code && translationStore.service) {
        updateLocalizationMessagesThunk(
          { code: translationStore.code, service: translationStore.service },
          form.data,
          () => (isDeleteDisabled.value = false),
        );
      }
    };

    const successCallback = () => {
      form.data = prepareDataForForm(defaultData.value, null);
      isDeleteDisabled.value = true;
    };

    const isShowItem = (key: string) => {
      switch (translationStore.filter.showType) {
        case TranslationFilterShowEnum.OnlyEmpty: {
          return !localizationData.value?.[key];
        }

        case TranslationFilterShowEnum.Certain: {
          return key.includes(translationStore.filter.searchString);
        }

        default: {
          return true;
        }
      }
    };

    return {
      getLoading,
      updateLoading,
      loaded,
      error,
      form,
      onSubmit,
      successCallback,
      isDeleteDisabled,
      isShowItem,
    };
  },
});
