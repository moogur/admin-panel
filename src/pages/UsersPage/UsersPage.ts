import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable } from '@shared/components';
import { getUsersThunk, useGetUserInfoStore, useGetUsersStore } from '@store';

import { CreateModal } from './CreateModal';
import { columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
    CreateModal,
  },
  setup() {
    const usersStore = useGetUsersStore();
    const { data, sorter, loading: usersLoading } = storeToRefs(usersStore);
    const { loading: userInfoLoading } = storeToRefs(useGetUserInfoStore());

    onMounted(getUsersThunk);
    onUnmounted(() => {
      usersStore.abortController?.abort();
      usersStore.$reset();
    });

    return {
      tableData: data,
      columns,
      getUsersThunk,
      sorter,
      usersLoading,
      userInfoLoading,
    };
  },
});
