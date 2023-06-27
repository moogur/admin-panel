import { showErrorMessage } from '@store/utils';

import { useChangeAvatarStore, useGetAvatarStore } from '../slice';

export async function changeAvatarThunk(url: string | null, file: File | null, successCallback?: () => void) {
  const changeAvatarStore = useChangeAvatarStore();
  const getAvatarStore = useGetAvatarStore();

  try {
    await changeAvatarStore.thunk(file);
    getAvatarStore.$patch({ data: url });
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
