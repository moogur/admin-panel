import { storeToRefs } from 'pinia';

import { logout } from '@shared/utils';

import { useAdminLogoutStore } from '../slice';

export async function adminLogoutThunk() {
  const logoutStore = useAdminLogoutStore();
  const { error } = storeToRefs(logoutStore);

  await logoutStore.thunk();

  if (error.value) return console.log(error.value.message);

  logout();
}
