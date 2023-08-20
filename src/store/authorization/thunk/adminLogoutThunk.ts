import { logout, showErrorMessage } from '@shared/utils';

import { useAdminLogoutStore } from '../slice';

export async function adminLogoutThunk() {
  const logoutStore = useAdminLogoutStore();

  try {
    await logoutStore.thunk();
  } catch (error) {
    showErrorMessage(error);
  } finally {
    logout();
  }
}
