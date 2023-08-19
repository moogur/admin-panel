import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable, MainError, Loader } from '@shared/components';
import { getUsersThunk, useGetUserInfoStore, useGetUsersStore } from '@store';

import { CreateModal } from './CreateModal';
import { columns } from './UsersPageConstants';

export default defineComponent({
  components: {
    CustomTable,
    CreateModal,
    MainError,
    Loader,
  },
  setup() {
    const usersStore = useGetUsersStore();
    const { data, sorter, loading: usersLoading, loaded, error } = storeToRefs(usersStore);
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
      loaded,
      error,
    };
  },
});
