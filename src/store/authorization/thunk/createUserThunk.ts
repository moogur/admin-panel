import { CreateUser } from '@api';
import { showErrorMessage } from '@shared/utils';

import { useCreateUserStore } from '../slice';

import { getUsersThunk } from './getUsersThunk';

export async function createUserThunk(body: CreateUser, successCallback?: () => void) {
  const createUserStore = useCreateUserStore();

  try {
    await createUserStore.thunk(body);
    getUsersThunk();
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
