import { UpdateUser } from '@api';
import { showErrorMessage } from '@store/utils';

import { useUpdateUserStore } from '../slice';

import { getUsersThunk } from './getUsersThunk';

export async function updateUserThunk(id: string, body: UpdateUser, successCallback?: () => void) {
  const updateUserStore = useUpdateUserStore();

  try {
    await updateUserStore.thunk(id, body);
    getUsersThunk();
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
