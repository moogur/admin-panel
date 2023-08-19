import router from '@router';
import { AUTH_KEY, links } from '@shared/constants';
import { useAuthStore, useGetServicesVersionsStore, useGetServicesIpsStore, useGetClientIpStore } from '@store';

export async function logout() {
  localStorage.setItem(AUTH_KEY, 'false');
  await router.push(links.login.path);

  useAuthStore().$reset();
  useGetServicesVersionsStore().$reset();
  useGetServicesIpsStore().$reset();
  useGetClientIpStore().$reset();
}
