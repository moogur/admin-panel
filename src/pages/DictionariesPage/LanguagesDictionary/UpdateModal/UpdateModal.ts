import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { LanguageDictionary, UpdateLanguageDictionary } from '@api';
import { SvgIcon, Modal, FormInput } from '@shared/components';
import { getLanguageNameRules } from '@shared/rules';
import { updateLanguageInDictionaryThunk, useUpdateUserStore } from '@store';

import { formTransformValues } from '../LanguagesDictionaryUtils';

import { initialValues } from './UpdateModalConstants';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
    FormInput,
  },
  props: {
    language: {
      type: Object as () => LanguageDictionary,
      required: true,
    },
  },
  setup(properties) {
    const updateUserStore = useUpdateUserStore();
    const { loading } = storeToRefs(updateUserStore);
    const showModal = ref(false);

    onUnmounted(() => {
      updateUserStore.abortController?.abort();
      updateUserStore.$reset();
    });

    const formData = reactive({ ...initialValues });

    const v$ = useVuelidate<UpdateLanguageDictionary>(
      {
        nameEn: getLanguageNameRules(true, true),
        nameSelf: getLanguageNameRules(false),
      },
      formData,
      { $lazy: true },
    );

    const openModal = () => {
      v$.value.$reset();
      Object.assign(formData, {
        nameEn: properties.language.nameEn,
        nameSelf: properties.language.nameSelf ?? initialValues.nameSelf,
      });

      showModal.value = true;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;
      updateLanguageInDictionaryThunk(
        properties.language.id,
        formTransformValues(formData, properties.language.nameSelf),
        () => (showModal.value = false),
      );
    };

    return {
      loading,
      showModal,
      onSubmit,
      openModal,
      formData,
      v$,
    };
  },
});
