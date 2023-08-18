import { Admin } from '@api';
import { successNotification } from '@shared/utils';
import { useAuthStore, useGetAvatarStore, useGetServicesIpsStore, useGetServicesVersionsStore } from '@store';

export async function requestsAfterLoginThunk(authData: Admin | null) {
  const getServicesVersionsStore = useGetServicesVersionsStore();
  const getServicesIpsStore = useGetServicesIpsStore();
  const getAvatarStore = useGetAvatarStore();
  const authStore = useAuthStore();

  const promises = [getServicesVersionsStore.thunk(), getServicesIpsStore.thunk()];

  if (authData?.hasAvatar || authStore.$state.user?.hasAvatar) promises.push(getAvatarStore.thunk());

  const results = await Promise.allSettled(promises);

  const isError = results.some((item) => item.status === 'rejected');
  if (isError) successNotification('An error occurred while receiving the data');
}
