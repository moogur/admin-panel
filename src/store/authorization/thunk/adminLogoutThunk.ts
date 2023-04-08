import { storeToRefs } from 'pinia';

import router from '@router';
import { links } from '@shared/constants';
import { useAuthStore } from '@store/app';

import { useAdminLoginStore, useAdminLogoutStore, useGetAdminInfoStore } from '../slice';

export async function adminLogoutThunk() {
  const logoutStore = useAdminLogoutStore();
  const { error } = storeToRefs(logoutStore);

  await logoutStore.thunk();

  if (error.value) return console.log(error.value.message);

  const authStore = useAuthStore();
  const adminLoginStore = useAdminLoginStore();
  const getAdminInfoStore = useGetAdminInfoStore();

  authStore.$reset();
  adminLoginStore.$reset();
  getAdminInfoStore.$reset();
  router.push(links.logout.path);
}
