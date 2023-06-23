import { showErrorMessage } from '@store/utils';

import { useGetServicesVersionsStore } from '../slice';

export async function getServicesVersionsThunk() {
  const getServicesVersionsStore = useGetServicesVersionsStore();

  try {
    await getServicesVersionsStore.thunk();
  } catch (error) {
    showErrorMessage(error);
  }
}
