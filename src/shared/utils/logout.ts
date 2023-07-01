import router from '@router';
import { AUTH_KEY, links } from '@shared/constants';
import { useAuthStore, useGetServicesVersionsStore, useGetServicesIpsStore, useGetClientIpStore } from '@store';

export function logout() {
  const authStore = useAuthStore();
  const getServicesVersionsStore = useGetServicesVersionsStore();
  const getServicesIpsStore = useGetServicesIpsStore();
  const getClientIpStore = useGetClientIpStore();

  localStorage.setItem(AUTH_KEY, 'false');
  authStore.$reset();
  getServicesVersionsStore.$reset();
  getServicesIpsStore.$reset();
  getClientIpStore.$reset();
  router.push(links.login.path);
}
