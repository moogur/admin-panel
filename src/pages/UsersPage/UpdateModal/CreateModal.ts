import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, reactive, ref } from 'vue';

import { UpdateUser } from '@api';
import { SvgIcon, Modal, CustomButton, FormInput } from '@shared/components';
import { useCreateUserStore, useGetUsersStore, useUpdateUserStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
    CustomButton,
    FormInput,
  },
  props: {
    userId: {
      type: String,
      default: '',
    },
    type: {
      type: String as () => 'create' | 'edit',
      required: true,
    },
  },
  setup(properties) {
    const createUserStore = useCreateUserStore();
    const { loading: createUserLoading } = storeToRefs(createUserStore);
    const updateUserStore = useUpdateUserStore();
    const { loading: updateUserLoading } = storeToRefs(updateUserStore);
    const { data } = storeToRefs(useGetUsersStore());
    const showModal = ref(false);

    onUnmounted(() => {
      [createUserStore, updateUserStore].forEach((store) => {
        store.abortController?.abort();
        store.$reset();
      });
    });

    const formData = reactive<Record<keyof UpdateUser, string>>({
      username: '',
      email: '',
      password: '',
      gender: '',
    });

    const openModal = () => {
      const user = properties.type === 'edit' ? data.value?.list.find((item) => item.id === properties.userId) : null;

      formData.username = user?.username ?? '';
      formData.email = user?.email ?? '';
      formData.password = '';
      showModal.value = true;
    };

    const onSubmit = () => {
      showModal.value = false;
    };

    return {
      isEdit: properties.type === 'edit',
      loading: createUserLoading || updateUserLoading,
      showModal,
      onSubmit,
      openModal,
      formData,
    };
  },
});
