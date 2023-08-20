import router from '@router';
import { links } from '@shared/constants';
import { useAuthStore, useGetServicesVersionsStore, useGetServicesIpsStore, useGetClientIpStore } from '@store';

import { setAuthToLS } from './localStorage';

export async function logout() {
  setAuthToLS(false);
  await router.push(links.login.path);

  useAuthStore().$reset();
  useGetServicesVersionsStore().$reset();
  useGetServicesIpsStore().$reset();
  useGetClientIpStore().$reset();
}
