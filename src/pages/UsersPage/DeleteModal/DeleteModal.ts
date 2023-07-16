import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, ref } from 'vue';

import { SvgIcon, Modal } from '@shared/components';
import { deleteUsersThunk, useDeleteUsersStore } from '@store';

export default defineComponent({
  components: {
    SvgIcon,
    Modal,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  setup(properties) {
    const deleteUsersStore = useDeleteUsersStore();
    const { loading } = storeToRefs(deleteUsersStore);
    const showModal = ref(false);

    onUnmounted(() => {
      deleteUsersStore.abortController?.abort();
      deleteUsersStore.$reset();
    });

    const deleteUser = () => {
      deleteUsersThunk([properties.userId], () => {
        showModal.value = false;
      });
    };

    return {
      loading,
      showModal,
      deleteUser,
    };
  },
});
