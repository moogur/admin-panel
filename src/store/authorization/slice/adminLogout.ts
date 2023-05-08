import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useAdminLogoutStore = defineStore({
  id: 'adminLogout',
  state: getBaseInitialState<OnlyId>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.adminLogout, {});
    },
  },
});
