import { defineStore } from 'pinia';

import { Admin } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetAdminInfoStore = defineStore({
  id: 'getAdminInfo',
  state: getBaseInitialState<Admin>(),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getAdminInfo);
    },
  },
});
