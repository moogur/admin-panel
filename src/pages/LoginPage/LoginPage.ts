import useVuelidate from '@vuelidate/core';
import { defineComponent, reactive } from 'vue';

import { LoginAdmin } from '@api';
import { adminLoginThunk } from '@store';

import { formValidationRules } from './constants';

export default defineComponent({
  setup() {
    const formData = reactive<LoginAdmin>({
      username: '',
      password: '',
    });

    const v$ = useVuelidate(formValidationRules, formData, { $lazy: true });

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      adminLoginThunk({ data: formData });
    };

    return { formData, v$, onSubmit };
  },
});
