import { Admin } from '@api';
import { successNotification } from '@shared/utils';
import { useAuthStore, useGetAvatarStore } from '@store';

export async function requestsAfterLoginThunk(authData?: Admin | null) {
  const getAvatarStore = useGetAvatarStore();
  const authStore = useAuthStore();

  if (authData?.hasAvatar || authStore.$state.user?.hasAvatar) {
    try {
      await getAvatarStore.thunk();
    } catch {
      successNotification('An error occurred while receiving the data');
    }
  }
}
