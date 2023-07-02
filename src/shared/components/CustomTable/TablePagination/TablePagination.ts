import { defineComponent, computed } from 'vue';

import { SvgIcon } from '@shared/components';
import { defaultPagination } from '@shared/constants';
import { TablePaginationConfig } from '@shared/types';

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    pagination: {
      type: Object as () => TablePaginationConfig,
      default: defaultPagination,
    },
  },
  emits: ['paginationChange'],
  setup(properties, { emit }) {
    const preparedData = computed(() => {
      let maxIndex = properties.pagination.pageNumber * properties.pagination.pageSize;
      const minIndex = maxIndex - properties.pagination.pageSize + 1;
      if (maxIndex > properties.pagination.total) maxIndex = properties.pagination.total;

      return {
        message: `Showing ${minIndex} to ${maxIndex} of ${properties.pagination.total} entries`,
        prevPage: properties.pagination.pageNumber - 1,
        nextPage: properties.pagination.pageNumber + 1,
      };
    });

    const pagePlusOne = () => {
      emit('paginationChange', { ...properties.pagination, pageNumber: preparedData.value.nextPage });
    };

    const pageMinusOne = () => {
      emit('paginationChange', { ...properties.pagination, pageNumber: preparedData.value.prevPage });
    };

    const setFirstPage = () => {
      emit('paginationChange', { ...properties.pagination, pageNumber: 1 });
    };

    const setLastPage = () => {
      emit('paginationChange', { ...properties.pagination, pageNumber: properties.pagination.pageCount });
    };

    return {
      preparedData,
      pagePlusOne,
      pageMinusOne,
      setFirstPage,
      setLastPage,
    };
  },
});
