import { HTTPError } from 'ky';
import assign from 'lodash-es/assign';
import { defineStore } from 'pinia';

import { Admin } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { BaseStore } from '@store/types';
import { additionToRequest, additionToError, baseInitialState } from '@store/utils';

export type GetAdminInfoStore = BaseStore<Admin>;

export const useGetAdminInfoStore = defineStore({
  id: 'getAdminInfo',
  state: (): GetAdminInfoStore => ({ ...baseInitialState }),
  actions: {
    async thunk() {
      this.loading = true;
      try {
        this.data = await authorizationService.getAdminInfo();
        assign(this, additionToRequest);
      } catch (error) {
        this.error = error instanceof HTTPError ? error : null;
        assign(this, additionToError);
      }
    },
  },
});
