import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { defineComponent, reactive } from 'vue';

import { adminLoginThunk } from '@store';

export default defineComponent({
  setup() {
    const state = reactive({
      username: '',
      password: '',
    });
    const rules = {
      username: { required, minLength: minLength(5) },
      password: { required, minLength: minLength(5) },
    };

    const v$ = useVuelidate(rules, state, { $lazy: true });

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      adminLoginThunk({ data: state });
    };

    return { state, v$, onSubmit };
  },
});
