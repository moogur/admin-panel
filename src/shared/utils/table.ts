import { BackSortOrder, BackSorter } from '@api';
import { BasePagination, Sort, SortOrder, TablePaginationConfig } from '@shared/types';

export function preparePaginationForRequest(pagination: TablePaginationConfig): BasePagination {
  return { pageNumber: pagination.pageNumber, pageSize: pagination.pageSize };
}

export function convertSortOrderForBack(sortOrder: SortOrder): BackSortOrder {
  switch (sortOrder) {
    case 'ascend': {
      return 'ASC';
    }

    case 'descend': {
      return 'DESC';
    }

    default: {
      return undefined;
    }
  }
}

export function prepareSorterForRequest<T extends string>(sorter: Sort<T>): BackSorter<T> {
  return { sortOrder: convertSortOrderForBack(sorter.sortOrder), sortField: sorter.key };
}
