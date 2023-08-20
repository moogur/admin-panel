import { showErrorMessage } from '@shared/utils';

import { useDeleteUsersStore } from '../slice';

import { getUsersThunk } from './getUsersThunk';

export async function deleteUsersThunk(ids: string[], successCallback?: () => void) {
  const deleteUsersStore = useDeleteUsersStore();

  try {
    await deleteUsersStore.thunk({ ids });
    getUsersThunk();
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
