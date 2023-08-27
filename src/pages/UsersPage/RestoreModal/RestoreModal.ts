import { storeToRefs } from 'pinia';
import { defineComponent, onUnmounted, ref } from 'vue';

import { SvgIcon, Modal } from '@shared/components';
import { restoreUsersThunk, useRestoreUsersStore } from '@store';

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
    const restoreUsersStore = useRestoreUsersStore();
    const { loading } = storeToRefs(restoreUsersStore);
    const showModal = ref(false);

    onUnmounted(() => {
      restoreUsersStore.abortController?.abort();
      restoreUsersStore.$reset();
    });

    const restoreUser = () => {
      restoreUsersThunk([properties.userId], () => {
        showModal.value = false;
      });
    };

    return {
      loading,
      showModal,
      restoreUser,
    };
  },
});
