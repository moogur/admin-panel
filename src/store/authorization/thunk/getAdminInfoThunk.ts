import { storeToRefs } from 'pinia';

import { login, logout } from '@shared/utils';

import { useGetAdminInfoStore } from '../slice';

import { requestsAfterLoginThunk } from './requestsAfterLoginThunk';

export async function getAdminInfoThunk() {
  const getAdminInfoStore = useGetAdminInfoStore();
  const { data } = storeToRefs(getAdminInfoStore);

  try {
    await getAdminInfoStore.thunk();

    await requestsAfterLoginThunk(data.value);

    login({ data: data.value });
  } catch {
    logout();
  }
}
