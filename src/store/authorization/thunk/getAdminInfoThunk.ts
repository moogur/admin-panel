import { storeToRefs } from 'pinia';

import { errorNotification } from '@shared/utils';
import { useAuthStore } from '@store/app';

import { useGetAdminInfoStore } from '../slice';

export async function getAdminInfoThunk() {
  const getAdminInfoStore = useGetAdminInfoStore();
  const { error, data } = storeToRefs(getAdminInfoStore);

  await getAdminInfoStore.thunk();

  if (error.value) return errorNotification(error.value);

  const auth = useAuthStore();
  auth.setAuth(data.value ?? { username: '', email: null, id: '' });
}
