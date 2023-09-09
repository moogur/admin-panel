import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { AddLanguageDictionary } from '@api';
import { Modal, CustomButton, FormInput } from '@shared/components';
import { getLanguageCodeRules, getLanguageNameRules } from '@shared/rules';
import { addLanguageToDictionaryThunk, useAddLanguageToDictionaryStore } from '@store';

import { formTransformValues } from '../LanguagesDictionaryUtils';

import { initialValues } from './AddModalConstants';

export default defineComponent({
  components: {
    Modal,
    CustomButton,
    FormInput,
  },
  setup() {
    const addLanguageToDictionaryStore = useAddLanguageToDictionaryStore();
    const { loading } = storeToRefs(addLanguageToDictionaryStore);
    const showModal = ref(false);

    onUnmounted(() => {
      addLanguageToDictionaryStore.abortController?.abort();
      addLanguageToDictionaryStore.$reset();
    });

    const formData = reactive({ ...initialValues });

    const v$ = useVuelidate<AddLanguageDictionary>(
      {
        code: getLanguageCodeRules(),
        nameEn: getLanguageNameRules(true, true),
        nameSelf: getLanguageNameRules(false),
      },
      formData,
      { $lazy: true },
    );

    const openModal = () => {
      Object.assign(formData, initialValues);
      v$.value.$reset();
      showModal.value = true;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;
      addLanguageToDictionaryThunk(formTransformValues(formData), () => (showModal.value = false));
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
