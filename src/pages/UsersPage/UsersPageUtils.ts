import { GetUsersQuery, UserSortOrderFields } from '@api';
import { TableChange } from '@shared/types';
import { preparePaginationForRequest, prepareSorterForRequest } from '@shared/utils';
import { getUsersThunk } from '@store';

import { defaultQueryParameters } from './constants';

function prepareQuery(values: TableChange<UserSortOrderFields>): GetUsersQuery {
  const preparedPagination = preparePaginationForRequest(values.pagination);
  if (values.sorter.sortOrder) {
    return {
      ...preparedPagination,
      ...prepareSorterForRequest(values.sorter),
    };
  }

  return preparedPagination;
}

export function tableChange(values: TableChange<UserSortOrderFields> = defaultQueryParameters) {
  getUsersThunk(prepareQuery(values), values.sorter);
}
