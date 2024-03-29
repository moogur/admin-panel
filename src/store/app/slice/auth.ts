import { defineStore } from 'pinia';

import { Admin } from '@api/AuthorizationApi';
import { getAuthFromLS } from '@shared/utils';

export type RedirectStore = {
  initialization: boolean;
  url: string | null;
  isAuth: boolean;
  user: Admin | null;
};

export const useAuthStore = defineStore({
  id: 'redirect',
  state: (): RedirectStore => ({
    url: null,
    isAuth: getAuthFromLS(),
    initialization: true,
    user: null,
  }),
  actions: {
    $reset() {
      this.$patch({ url: null, isAuth: false, user: null });
    },

    setWasInitialized() {
      this.initialization = false;
    },
    setRedirectUrl(url: string | null) {
      this.url = url;
    },
    setAuth(user: Admin) {
      this.isAuth = true;
      this.user = user;
    },
    updateUserInfo(user: Omit<Admin, 'id' | 'hasAvatar'>) {
      this.user = { id: this.user?.id ?? '', hasAvatar: Boolean(this.user?.hasAvatar), ...user };
    },
  },
});
