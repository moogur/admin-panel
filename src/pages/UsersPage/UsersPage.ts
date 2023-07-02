import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable } from '@shared/components';
import { useGetUserInfoStore, useGetUsersStore } from '@store';

import { tableChange } from './UsersPageUtils';
import { columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
  },
  setup() {
    const usersStore = useGetUsersStore();
    const userInfoStore = useGetUserInfoStore();
    const { data, sorter, loading: usersLoading } = storeToRefs(usersStore);
    const { loading: userInfoLoading } = storeToRefs(userInfoStore);

    onMounted(tableChange);
    onUnmounted(() => {
      usersStore.abortController?.abort();
      usersStore.$reset();
    });

    return {
      tableData: data,
      columns,
      tableChange,
      sorter,
      usersLoading,
      userInfoLoading,
    };
  },
});
