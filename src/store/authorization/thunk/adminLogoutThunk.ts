import { storeToRefs } from 'pinia';

import { errorNotification, logout } from '@shared/utils';

import { useAdminLogoutStore } from '../slice';

export async function adminLogoutThunk() {
  const logoutStore = useAdminLogoutStore();
  const { error } = storeToRefs(logoutStore);

  await logoutStore.thunk();

  if (error.value) errorNotification(error.value);

  logout();
}
