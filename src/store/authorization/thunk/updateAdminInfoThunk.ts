import { storeToRefs } from 'pinia';

import { UpdateAdminBody } from '@api';
import { errorNotification, successNotification } from '@shared/utils';
import { useAuthStore } from '@store/app';

import { useUpdateAdminInfoStore } from '../slice';

export async function updateAdminInfoThunk(body: UpdateAdminBody, successCallback?: () => void) {
  const updateAdminInfoStore = useUpdateAdminInfoStore();
  const { error, data } = storeToRefs(updateAdminInfoStore);

  await updateAdminInfoStore.thunk(body);

  if (error.value) return errorNotification(error.value);

  successNotification('User data updated successfully');
  successCallback?.();

  const auth = useAuthStore();
  const { password, ...other } = body;
  auth.updateUserInfo({ id: data.value?.id ?? '', ...other });
}
