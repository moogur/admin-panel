import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { CustomTable } from '@shared/components';
import { useGetServicesVersionsStore } from '@store';

import { Service } from './MainPageTypes';
import { baseDataSource, columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
  },
  setup() {
    const getServicesVersionsStore = useGetServicesVersionsStore();
    const { data } = storeToRefs(getServicesVersionsStore);

    const dataSource: Service[] = baseDataSource.map(({ versionDataIndex, ...other }) => ({
      ...other,
      version: data.value?.[versionDataIndex],
    }));

    return {
      dataSource,
      columns,
    };
  },
});
