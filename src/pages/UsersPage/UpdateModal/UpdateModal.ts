import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { BaseUser, CreateUser } from '@api';
import { SvgIcon, Modal, FormInput, FormSelect, FormPassword } from '@shared/components';
import { getEmailValidationRules, getPasswordValidationRules, getUsernameValidationRules } from '@shared/rules';
import { updateUserThunk, useUpdateUserStore } from '@store';

import { genderOptions, initialValues } from '../UsersPageConstants';

import { transformValues } from './UpdateModalUtils';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
    FormInput,
    FormSelect,
    FormPassword,
  },
  props: {
    user: {
      type: Object as () => BaseUser,
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

    const formData: CreateUser = reactive({ ...initialValues });

    const v$ = useVuelidate(
      {
        username: getUsernameValidationRules(true),
        password: getPasswordValidationRules(false),
        email: getEmailValidationRules(true),
      },
      formData,
      { $lazy: true },
    );

    const openModal = () => {
      v$.value.$reset();
      Object.assign(formData, {
        username: properties.user.username,
        email: properties.user.email,
        gender: properties.user.gender,
        password: initialValues.password,
      });

      showModal.value = true;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;
      updateUserThunk(properties.user.id, transformValues(formData), () => (showModal.value = false));
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
