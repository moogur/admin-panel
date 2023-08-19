import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { Modal, CustomButton, FormInput, FormSelect } from '@shared/components';
import { createUserThunk, useCreateUserStore } from '@store';

import { initialValues, genderOptions, createFormValidationRules } from './CreateModalConstants';

export default defineComponent({
  components: {
    Modal,
    CustomButton,
    FormInput,
    FormSelect,
  },
  setup() {
    const createUserStore = useCreateUserStore();
    const { loading } = storeToRefs(createUserStore);
    const showModal = ref(false);

    onUnmounted(() => {
      createUserStore.abortController?.abort();
      createUserStore.$reset();
    });

    const formData = reactive({ ...initialValues });

    const v$ = useVuelidate(createFormValidationRules, formData, { $lazy: true });

    const openModal = () => {
      Object.assign(formData, initialValues);
      v$.value.$reset();
      showModal.value = true;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;
      createUserThunk(formData, () => (showModal.value = false));
    };

    return {
      loading,
      showModal,
      onSubmit,
      openModal,
      formData,
      genderOptions,
      v$,
    };
  },
});
