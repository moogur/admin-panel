import { storeToRefs } from 'pinia';

import { login } from '@shared/utils';
import { showErrorMessage } from '@store/utils';

import { useGetAdminInfoStore } from '../slice';

export async function getAdminInfoThunk() {
  const getAdminInfoStore = useGetAdminInfoStore();
  const { data } = storeToRefs(getAdminInfoStore);

  try {
    await getAdminInfoStore.thunk();

    login({ data: data.value });
  } catch (error) {
    showErrorMessage(error);
  }
}
