import { defineComponent } from 'vue';

import { SvgIcon } from '@shared/components';
import { ColumnType, Sort, TablePaginationConfig } from '@shared/types';

import { getCurrentSortOrder } from './CustomTableUtils';
import { TablePagination } from './TablePagination';

export default defineComponent({
  components: {
    TablePagination,
    SvgIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      required: true,
      type: Array<unknown>,
    },
    columns: {
      required: true,
      type: Array<ColumnType<unknown>>,
    },
    pagination: {
      type: Object as () => TablePaginationConfig | undefined,
      default: undefined,
    },
    sorter: {
      type: Object as () => Sort<string> | undefined,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['tableChange'],
  setup(properties, { emit }) {
    const changeSorter = (key: string) => {
      emit('tableChange', {
        action: 'sorter',
        pagination: { ...properties.pagination },
        sorter: { key, sortOrder: getCurrentSortOrder(key, properties.sorter) },
      });
    };

    const changePagination = (newPagination: TablePaginationConfig) => {
      emit('tableChange', {
        action: 'pagination',
        pagination: newPagination,
        sorter: { ...properties.sorter },
      });
    };

    return {
      changePagination,
      changeSorter,
    };
  },
});
