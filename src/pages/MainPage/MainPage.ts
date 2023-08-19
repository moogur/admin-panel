import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { CustomTable } from '@shared/components';
import { useGetServicesVersionsStore, useGetServicesIpsStore } from '@store';

import { Service } from './MainPageTypes';
import { baseDataSource, columns } from './constants';

export default defineComponent({
  components: {
    CustomTable,
  },
  setup() {
    const { data: versions } = storeToRefs(useGetServicesVersionsStore());
    const { data: ips } = storeToRefs(useGetServicesIpsStore());

    const dataSource: Service[] = baseDataSource.map(({ dataIndex, ...other }) => ({
      ...other,
      version: versions.value?.[dataIndex],
      ip: ips.value?.[dataIndex],
    }));

    return {
      dataSource,
      columns,
    };
  },
});
