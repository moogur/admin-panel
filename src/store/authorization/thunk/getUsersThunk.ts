import { UserSortOrderFields } from '@api';
import { defaultPagination } from '@shared/constants';
import { TableChange } from '@shared/types';
import { prepareQuery, showErrorMessage } from '@shared/utils';

import { useGetUsersStore } from '../slice';

export async function getUsersThunk(values: Partial<TableChange<UserSortOrderFields>> = {}) {
  const getUsersStore = useGetUsersStore();

  try {
    const mergedValues = {
      action: values.action ?? null,
      pagination: values.pagination ?? getUsersStore.data?.pagination ?? defaultPagination,
      sorter: values.sorter ?? getUsersStore.sorter,
    };

    await getUsersStore.thunk(prepareQuery(mergedValues));
    getUsersStore.$patch({ sorter: mergedValues.sorter });
  } catch (error) {
    showErrorMessage(error);
  }
}
