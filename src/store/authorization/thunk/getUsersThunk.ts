import { GetUsersQuery, UserSortOrderFields } from '@api';
import { Sort } from '@shared/types';
import { showErrorMessage } from '@store/utils';

import { useGetUsersStore } from '../slice';

export async function getUsersThunk(queryParameters: GetUsersQuery, sorter: Sort<UserSortOrderFields>) {
  const getUsersStore = useGetUsersStore();

  try {
    await getUsersStore.thunk(queryParameters);
    getUsersStore.$patch({ sorter });
  } catch (error) {
    showErrorMessage(error);
  }
}
