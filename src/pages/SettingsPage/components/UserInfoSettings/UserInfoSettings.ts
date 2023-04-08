import useVuelidate from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted, ref, reactive } from 'vue';

import { Modal } from '@shared/components';
import {
  useAuthStore,
  getAdminInfoThunk,
  useGetAdminInfoStore,
  updateAdminInfoThunk,
  useUpdateAdminInfoStore,
} from '@store';

import { prepareFormData } from './UserInfoSettingsUtils';
import { list } from './constants';

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const { user } = storeToRefs(useAuthStore());
    const updateInfoStore = useUpdateAdminInfoStore();
    const infoStore = useGetAdminInfoStore();
    const { loading } = storeToRefs(infoStore);
    const showModal = ref(false);

    const formData = reactive({
      username: '',
      email: '',
      password: '',
    });
    const rules = {
      username: { required, minLength: minLength(5) },
      email: { minLength: minLength(10), email },
      password: { minLength: minLength(10) },
    };

    onMounted(getAdminInfoThunk);
    onUnmounted(() => {
      infoStore.$reset();
      updateInfoStore.$reset();
    });

    const v$ = useVuelidate(rules, formData, { $lazy: true });

    const setShowModal = (show: boolean) => {
      formData.username = user.value?.username ?? '';
      formData.email = user.value?.email ?? '';
      formData.password = '';
      showModal.value = show;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;

      updateAdminInfoThunk(prepareFormData(formData), () => {
        showModal.value = false;
      });
    };

    return {
      user,
      list,
      loading,
      showModal,
      setShowModal,
      formData,
      v$,
      onSubmit,
    };
  },
});
