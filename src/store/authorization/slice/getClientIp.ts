import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetClientIpStore = defineStore({
  id: 'getClientIp',
  state: getBaseInitialState<{ ip: string | null }>(true),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getClientIp);
    },
  },
});
