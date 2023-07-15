import { Admin } from '@api';
import router from '@router';
import { AUTH_KEY, links } from '@shared/constants';
import { useAuthStore } from '@store';

export function login({ data, needRedirect }: { data: Admin | null; needRedirect?: boolean }) {
  const authStore = useAuthStore();

  localStorage.setItem(AUTH_KEY, 'true');
  authStore.setAuth(data ?? { username: '', email: null, id: '', hasAvatar: false });

  if (needRedirect) {
    router.push(authStore.url ?? links.main.path);
    if (authStore.url) authStore.setRedirectUrl(null);
  }
}
