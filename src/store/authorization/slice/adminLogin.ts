import { HTTPError } from 'ky';
import assign from 'lodash-es/assign';
import { defineStore } from 'pinia';

import { Admin, LoginAdmin } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { RequestConfig } from '@shared/types';
import { BaseStore } from '@store/types';
import { additionToRequest, additionToError, baseInitialState } from '@store/utils';

export type AdminLoginStore = BaseStore<Admin>;

export const useAdminLoginStore = defineStore({
  id: 'adminLogin',
  state: (): AdminLoginStore => ({ ...baseInitialState }),
  actions: {
    async thunk(data: RequestConfig<LoginAdmin>) {
      this.loading = true;
      try {
        this.data = await authorizationService.adminLogin(data);
        assign(this, additionToRequest);
      } catch (error) {
        this.error = error instanceof HTTPError ? error : null;
        assign(this, additionToError);
      }
    },
  },
});
