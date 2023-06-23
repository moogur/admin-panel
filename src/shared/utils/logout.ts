import router from '@router';
import { AUTH_KEY, links } from '@shared/constants';
import { useAuthStore, useGetServicesVersionsStore } from '@store';

export function logout() {
  const authStore = useAuthStore();
  const getServicesVersionsStore = useGetServicesVersionsStore();

  localStorage.setItem(AUTH_KEY, 'false');
  authStore.$reset();
  getServicesVersionsStore.$reset();
  router.push(links.login.path);
}
