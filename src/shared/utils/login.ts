import { Admin } from '@api';
import router from '@router';
import { links } from '@shared/constants';
import { useAuthStore } from '@store';

import { setAuthToLS } from './localStorage';

export function login({ data, needRedirect }: { data: Admin | null; needRedirect?: boolean }) {
  const authStore = useAuthStore();

  setAuthToLS(true);
  authStore.setAuth(data ?? { username: '', email: null, id: '', hasAvatar: false });

  if (needRedirect) {
    router.push(authStore.url ?? links.main.path);
    if (authStore.url) authStore.setRedirectUrl(null);
  }
}
