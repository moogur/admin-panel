import { successNotification } from '@shared/utils';
import { useGetAvatarStore, useGetServicesVersionsStore } from '@store';

export async function requestsAfterLoginThunk() {
  const getServicesVersionsStore = useGetServicesVersionsStore();
  const getAvatarStore = useGetAvatarStore();

  const promises = [getServicesVersionsStore.thunk(), getAvatarStore.thunk()];

  const results = await Promise.allSettled(promises);

  const isError = results.some((item) => item.status === 'rejected');
  if (isError) successNotification('An error occurred while receiving the data');
}
