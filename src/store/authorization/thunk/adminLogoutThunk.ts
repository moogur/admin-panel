import { logout } from '@shared/utils';
import { showErrorMessage } from '@store/utils';

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
