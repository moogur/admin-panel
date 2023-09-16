import { defineStore } from 'pinia';

import { ServicesIps } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetServicesIpsStore = defineStore({
  id: 'getServicesIps',
  state: getBaseInitialState<ServicesIps>({ cacheRequest: true, throwExceptionOnError: false }),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getServicesIps);
    },
  },
});
