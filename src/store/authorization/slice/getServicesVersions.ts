import { defineStore } from 'pinia';

import { ServicesVersions } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetServicesVersionsStore = defineStore({
  id: 'getServicesVersions',
  state: getBaseInitialState<ServicesVersions>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.getServicesVersions, {});
    },
  },
});
