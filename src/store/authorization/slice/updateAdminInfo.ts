import { defineStore } from 'pinia';

import { UpdateAdminBody } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateAdminInfoStore = defineStore({
  id: 'updateAdminInfo',
  state: getBaseInitialState<OnlyId>(),
  actions: {
    thunk(data: UpdateAdminBody) {
      return thunkRequestHelper(this, authorizationService.updateAdminInfo({ data }));
    },
  },
});
