import { defineStore } from 'pinia';

import { Admin, LoginAdmin } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useAdminLoginStore = defineStore({
  id: 'adminLogin',
  state: getBaseInitialState<Admin>(),
  actions: {
    thunk(body: LoginAdmin) {
      return thunkRequestHelper(this, authorizationService.adminLogin, { body });
    },
  },
});
