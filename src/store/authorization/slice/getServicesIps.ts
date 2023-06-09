import { defineStore } from 'pinia';

import { ServicesIps } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetServicesIpsStore = defineStore({
  id: 'getServicesIps',
  state: getBaseInitialState<ServicesIps>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.getServicesIps, {});
    },
  },
});
