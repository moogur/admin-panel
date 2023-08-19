import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onUnmounted, reactive, ref } from 'vue';

import { SvgIcon, Modal, FormInput, FormSelect } from '@shared/components';
import { updateUserThunk, useGetUsersStore, useUpdateUserStore } from '@store';

import { initialValues, updateFormValidationRules, genderOptions } from './UpdateModalConstants';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
    FormInput,
    FormSelect,
  },
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
  setup(properties) {
    const updateUserStore = useUpdateUserStore();
    const { loading } = storeToRefs(updateUserStore);
    const { data } = storeToRefs(useGetUsersStore());
    const showModal = ref(false);

    onUnmounted(() => {
      updateUserStore.abortController?.abort();
      updateUserStore.$reset();
    });

    const formData = reactive({ ...initialValues });

    const v$ = useVuelidate(updateFormValidationRules, formData as any, { $lazy: true });

    const user = computed(() => data.value?.list.find((item) => item.id === properties.userId));

    const openModal = () => {
      Object.assign(formData, initialValues, { username: user.value?.username, email: user.value?.email });
      v$.value.$reset();

      showModal.value = true;
    };

    const onSubmit = () => {
      v$.value.$touch();
      if (v$.value.$invalid) return;
      updateUserThunk(properties.userId, formData, () => (showModal.value = false));
    };

    return {
      loading,
      showModal,
      onSubmit,
      openModal,
      formData,
      genderOptions,
      v$,
      user,
    };
  },
});
