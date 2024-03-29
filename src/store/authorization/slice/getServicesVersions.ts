import { defineStore } from 'pinia';

import { ServicesVersions } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetServicesVersionsStore = defineStore({
  id: 'getServicesVersions',
  state: getBaseInitialState<ServicesVersions>({ cacheRequest: true, throwExceptionOnError: false }),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getServicesVersions);
    },
  },
});
