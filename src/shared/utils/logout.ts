import router from '@router';
import { links } from '@shared/constants';
import { useAdminLoginStore, useAuthStore, useGetAdminInfoStore } from '@store';

export function logout() {
  const authStore = useAuthStore();
  const adminLoginStore = useAdminLoginStore();
  const getAdminInfoStore = useGetAdminInfoStore();

  authStore.$reset();
  adminLoginStore.$reset();
  getAdminInfoStore.$reset();
  router.push(links.logout.path);
}
