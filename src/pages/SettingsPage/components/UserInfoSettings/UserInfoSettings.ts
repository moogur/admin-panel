import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted, ref, reactive } from 'vue';

import { UpdateAdminBody } from '@api';
import { Modal, FormInput, CustomButton, List } from '@shared/components';
import {
  useAuthStore,
  getAdminInfoThunk,
  useGetAdminInfoStore,
  updateAdminInfoThunk,
  useUpdateAdminInfoStore,
} from '@store';

import { prepareFormData } from './UserInfoSettingsUtils';
import { formValidationRules, list } from './constants';

export default defineComponent({
  components: {
    Modal,
    FormInput,
    CustomButton,
    List,
  },
  setup() {
    const { user } = storeToRefs(useAuthStore());
    const updateInfoStore = useUpdateAdminInfoStore();
    const infoStore = useGetAdminInfoStore();
    const { loading: updateLoading } = storeToRefs(updateInfoStore);
    const { loading: infoLoading } = storeToRefs(infoStore);
    const showModal = ref(false);

    const formData = reactive<Record<keyof UpdateAdminBody, string>>({
      username: '',
      email: '',
      password: '',
    });

    onMounted(getAdminInfoThunk);
    onUnmounted(() => {
      infoStore.abortController?.abort();
      infoStore.$reset();
      updateInfoStore.$reset();
    });

    const v$ = useVuelidate(formValidationRules, formData, { $lazy: true });

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

    const data = list.map((item) => ({ title: item.title, value: user.value?.[item.key] ?? '-' }));

    return {
      user,
      data,
      infoLoading,
      updateLoading,
      showModal,
      setShowModal,
      formData,
      v$,
      onSubmit,
    };
  },
});
