import { storeToRefs } from 'pinia';

import { useAuthStore } from '@store/app';

import { useGetAdminInfoStore } from '../slice';

export async function getAdminInfoThunk() {
  const { error } = storeToRefs(useGetAdminInfoStore());
  const { thunk } = useGetAdminInfoStore();

  await thunk();

  if (error.value) return console.log(error.value.message);

  const auth = useAuthStore();
  auth.setAuth(true);
}
