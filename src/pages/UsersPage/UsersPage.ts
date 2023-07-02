import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable } from '@shared/components';
import { useGetUsersStore } from '@store';

import { tableChange } from './UsersPageUtils';
import { columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
  },
  setup() {
    const usersStore = useGetUsersStore();
    const { data, sorter, loading } = storeToRefs(usersStore);

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
      loading,
    };
  },
});
