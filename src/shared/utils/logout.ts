import router from '@router';
import { AUTH_KEY, links } from '@shared/constants';
import { useAuthStore } from '@store';

export function logout() {
  const authStore = useAuthStore();

  localStorage.setItem(AUTH_KEY, 'false');
  authStore.$reset();
  router.push(links.login.path);
}
