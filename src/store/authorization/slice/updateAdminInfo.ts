import { defineStore } from 'pinia';

import { Admin, UpdateAdminBody } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateAdminInfoStore = defineStore({
  id: 'updateAdminInfo',
  state: getBaseInitialState<Admin>(),
  actions: {
    thunk(body: UpdateAdminBody) {
      return thunkRequestHelper(this, authorizationService.updateAdminInfo, { body });
    },
  },
});
