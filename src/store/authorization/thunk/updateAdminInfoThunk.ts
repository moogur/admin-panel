import { UpdateAdminBody } from '@api';
import { successNotification, showErrorMessage } from '@shared/utils';
import { useAuthStore } from '@store/app';

import { useUpdateAdminInfoStore } from '../slice';

export async function updateAdminInfoThunk(body: UpdateAdminBody, successCallback?: () => void) {
  const updateAdminInfoStore = useUpdateAdminInfoStore();

  try {
    await updateAdminInfoStore.thunk(body);

    successNotification('User data updated successfully');
    successCallback?.();

    const auth = useAuthStore();
    const { password, ...other } = body;
    auth.updateUserInfo(other);
  } catch (error) {
    showErrorMessage(error);
  }
}
