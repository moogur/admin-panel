import { storeToRefs } from 'pinia';

import { UpdateAdminBody } from '@api';
import { useAuthStore } from '@store/app';

import { useUpdateAdminInfoStore } from '../slice';

export async function updateAdminInfoThunk(body: UpdateAdminBody, successCallback?: () => void) {
  const updateAdminInfoStore = useUpdateAdminInfoStore();
  const { error, data } = storeToRefs(updateAdminInfoStore);

  await updateAdminInfoStore.thunk(body);

  if (error.value || !data.value) return console.log(error.value?.message);

  successCallback?.();
  const auth = useAuthStore();
  const { password, ...other } = body;
  auth.updateUserInfo({ id: data.value.id, ...other });
}
