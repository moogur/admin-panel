import { showErrorMessage } from '@shared/utils';

import { useRestoreUsersStore } from '../slice';

import { getUsersThunk } from './getUsersThunk';

export async function restoreUsersThunk(ids: string[], successCallback?: () => void) {
  const restoreUsersStore = useRestoreUsersStore();

  try {
    await restoreUsersStore.thunk({ ids });
    getUsersThunk();
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
