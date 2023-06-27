import { showErrorMessage } from '@store/utils';

import { useGetClientIpStore } from '../slice';

export async function getClientIpThunk() {
  const getClientIpStore = useGetClientIpStore();

  try {
    await getClientIpStore.thunk();
  } catch (error) {
    showErrorMessage(error);
  }
}
