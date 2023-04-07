import { HTTPError } from 'ky';
import assign from 'lodash-es/assign';
import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { BaseStore } from '@store/types';
import { additionToRequest, additionToError, baseInitialState } from '@store/utils';

export type AdminLogoutStore = BaseStore<OnlyId>;

export const useAdminLogoutStore = defineStore({
  id: 'adminLogout',
  state: (): AdminLogoutStore => ({ ...baseInitialState }),
  actions: {
    async thunk() {
      this.loading = true;
      try {
        this.data = await authorizationService.adminLogout();
        assign(this, additionToRequest);
      } catch (error) {
        this.error = error instanceof HTTPError ? error : null;
        assign(this, additionToError);
      }
    },
  },
});
