import { defineStore } from 'pinia';

import { AUTH_KEY } from '@shared/constants';

export type RedirectStore = { url: string | null; isAuth: boolean; initialization: boolean };

export const useAuthStore = defineStore({
  id: 'redirect',
  state: (): RedirectStore => ({
    url: null,
    isAuth: localStorage.getItem(AUTH_KEY) === 'true',
    initialization: true,
  }),
  actions: {
    $reset() {
      localStorage.setItem(AUTH_KEY, 'false');
      this.$patch({ url: null, isAuth: false });
    },

    setRedirectUrl(url: string | null) {
      this.url = url;
    },
    setAuth(isAuth: boolean) {
      this.isAuth = isAuth;
      localStorage.setItem(AUTH_KEY, String(isAuth));
    },
    setWasInitialized() {
      this.initialization = false;
    },
  },
});
