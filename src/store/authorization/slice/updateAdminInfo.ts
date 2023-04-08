import { HTTPError } from 'ky';
import assign from 'lodash-es/assign';
import { defineStore } from 'pinia';

import { UpdateAdminBody } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { BaseStore } from '@store/types';
import { additionToRequest, additionToError, baseInitialState } from '@store/utils';

export type UpdateAdminInfoStore = BaseStore<OnlyId>;

export const useUpdateAdminInfoStore = defineStore({
  id: 'updateAdminInfo',
  state: (): UpdateAdminInfoStore => ({ ...baseInitialState }),
  actions: {
    async thunk(data: UpdateAdminBody) {
      this.loading = true;
      try {
        this.data = await authorizationService.updateAdminInfo({ data });
        assign(this, additionToRequest);
      } catch (error) {
        this.error = error instanceof HTTPError ? error : null;
        assign(this, additionToError);
      }
    },
  },
});
