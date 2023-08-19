import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { Modal, CustomButton, FormInput, FormSelect, FormPassword } from '@shared/components';
import { getEmailValidationRules, getPasswordValidationRules, getUsernameValidationRules } from '@shared/rules';
import { createUserThunk, useCreateUserStore } from '@store';

import { genderOptions, initialValues } from '../UsersPageConstants';

export default defineComponent({
  components: {
    Modal,
    CustomButton,
    FormInput,
    FormSelect,
    FormPassword,
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

    const v$ = useVuelidate(
      {
        username: getUsernameValidationRules(true),
        password: getPasswordValidationRules(true),
        email: getEmailValidationRules(true),
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
