import { GetUsersQuery } from '@api';
import { showErrorMessage } from '@store/utils';

import { useGetUsersStore } from '../slice';

export async function getUsersThunk(queryParameters: GetUsersQuery) {
  const getUsersInfoStore = useGetUsersStore();

  try {
    await getUsersInfoStore.thunk(queryParameters);
  } catch (error) {
    showErrorMessage(error);
  }
}
