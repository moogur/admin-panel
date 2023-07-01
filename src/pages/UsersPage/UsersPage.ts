import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { CustomTable } from '@shared/components';
import { getUsersThunk, useGetUsersStore } from '@store';

import { columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
  },
  setup() {
    const usersStore = useGetUsersStore();
    const { data } = storeToRefs(usersStore);

    onMounted(() => getUsersThunk({ pageNumber: 1, pageSize: 10 }));
    onUnmounted(() => {
      usersStore.abortController?.abort();
      usersStore.$reset();
    });

    return {
      tableData: data,
      columns,
    };
  },
});
