import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, reactive } from 'vue';

import { LoginAdmin } from '@api';
import { FormInput, CustomButton, FormPassword } from '@shared/components';
import { getPasswordValidationRules, getUsernameValidationRules } from '@shared/rules';
import { adminLoginThunk, useAdminLoginStore, useGetAdminInfoStore } from '@store';

export default defineComponent({
  components: {
    FormInput,
    CustomButton,
    FormPassword,
  },
  setup() {
    const getAdminInfoStore = useGetAdminInfoStore();
    const adminLoginStore = useAdminLoginStore();
    const { loading } = storeToRefs(adminLoginStore);
    const formData = reactive<LoginAdmin>({
      username: '',
      password: '',
    });

    onMounted(() => {
      adminLoginStore.$reset();
      getAdminInfoStore.$reset();
    });

    const v$ = useVuelidate(
      {
        username: getUsernameValidationRules(true),
        password: getPasswordValidationRules(true),
      },
      formData,
      { $lazy: true },
    );

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      adminLoginThunk(formData);
    };

    return { formData, v$, onSubmit, loading };
  },
});
