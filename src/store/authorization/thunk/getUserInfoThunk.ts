import { showErrorMessage } from '@store/utils';

import { useGetUserInfoStore } from '../slice';

export async function getUserInfoThunk(id: string, successCallback?: () => void) {
  const getUserInfoStore = useGetUserInfoStore();

  try {
    await getUserInfoStore.thunk({ id });

    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
