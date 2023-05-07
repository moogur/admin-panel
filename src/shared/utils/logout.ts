import { ApiError } from '@api/baseApi';
import router from '@router';
import { links } from '@shared/constants';
import { errorNotification } from '@shared/utils';
import { useAdminLoginStore, useAuthStore, useGetAdminInfoStore } from '@store';

export function logout(error?: ApiError) {
  errorNotification(error);
  const authStore = useAuthStore();
  const adminLoginStore = useAdminLoginStore();
  const getAdminInfoStore = useGetAdminInfoStore();

  authStore.$reset();
  adminLoginStore.$reset();
  getAdminInfoStore.$reset();
  router.push(links.logout.path);
}
