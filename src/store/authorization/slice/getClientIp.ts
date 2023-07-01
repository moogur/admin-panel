import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetClientIpStore = defineStore({
  id: 'getClientIp',
  state: getBaseInitialState<{ ip: string | null }>(),
  actions: {
    thunk() {
      return thunkRequestHelper(this, authorizationService.getClientIp, {});
    },
  },
});
