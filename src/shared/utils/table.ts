import { BackSortOrder, BackSorter } from '@api';
import { BasePagination, Sort, SortOrder, TableChange, TablePaginationConfig } from '@shared/types';

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

export function prepareQuery<SortKey extends string>(
  values: TableChange<SortKey>,
): BasePagination & BackSorter<SortKey> {
  const preparedPagination = preparePaginationForRequest(values.pagination);
  if (values.sorter.sortOrder) {
    return {
      ...preparedPagination,
      ...prepareSorterForRequest(values.sorter),
    };
  }

  return preparedPagination;
}
