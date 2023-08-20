import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetAvatarStore = defineStore({
  id: 'getAvatar',
  state: getBaseInitialState<string>(),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getAvatar);
    },
  },
});
