import { defineStore } from 'pinia';

import { User } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { OnlyId } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetUserInfoStore = defineStore({
  id: 'getUserInfo',
  state: getBaseInitialState<User>(),
  actions: {
    thunk(urlParameters: OnlyId) {
      return thunkRequestHelper(this, authorizationService.getUserInfo, { urlParameters });
    },
  },
});
