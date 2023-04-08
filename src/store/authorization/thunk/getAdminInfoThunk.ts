import { storeToRefs } from 'pinia';

import { useAuthStore } from '@store/app';

import { useGetAdminInfoStore } from '../slice';

export async function getAdminInfoThunk() {
  const getAdminInfoStore = useGetAdminInfoStore();
  const { error, data } = storeToRefs(getAdminInfoStore);

  await getAdminInfoStore.thunk();

  if (error.value || !data.value) return console.log(error.value?.message);

  const auth = useAuthStore();
  auth.setAuth(data.value);
}
