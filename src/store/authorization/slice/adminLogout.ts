import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useAdminLogoutStore = defineStore({
  id: 'adminLogout',
  state: getBaseInitialState<OnlyId>(),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.adminLogout);
    },
  },
});
