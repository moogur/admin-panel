import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, reactive } from 'vue';

import { LoginAdmin } from '@api';
import { FormInput, CustomButton } from '@shared/components';
import { loginFormValidationRules } from '@shared/rules';
import { adminLoginThunk, useAdminLoginStore, useGetAdminInfoStore } from '@store';

export default defineComponent({
  components: {
    FormInput,
    CustomButton,
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

    const v$ = useVuelidate(loginFormValidationRules, formData, { $lazy: true });

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      adminLoginThunk(formData);
    };

    return { formData, v$, onSubmit, loading };
  },
});
