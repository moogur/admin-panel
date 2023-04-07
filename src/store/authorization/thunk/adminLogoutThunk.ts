import { storeToRefs } from 'pinia';

import router from '@router';
import { links } from '@shared/constants';
import { useAuthStore } from '@store/app';

import { useAdminLogoutStore, useAdminLoginStore } from '../slice';

export async function adminLogoutThunk() {
  const { error } = storeToRefs(useAdminLogoutStore());
  const { thunk } = useAdminLogoutStore();

  await thunk();

  if (error.value) return console.log(error.value.message);

  const auth = useAuthStore();
  const adminLogin = useAdminLoginStore();

  auth.$reset();
  adminLogin.$reset();
  router.push(links.logout.path);
}
