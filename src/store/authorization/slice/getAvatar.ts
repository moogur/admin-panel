import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetAvatarStore = defineStore({
  id: 'getAvatar',
  state: getBaseInitialState<string>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.getAvatar, {});
    },
  },
});
