import { defineStore } from 'pinia';

import { Admin } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetAdminInfoStore = defineStore({
  id: 'getAdminInfo',
  state: getBaseInitialState<Admin>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.getAdminInfo, {});
    },
  },
});
