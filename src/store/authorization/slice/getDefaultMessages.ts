import { defineStore } from 'pinia';

import { GetDefaultMessages } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetDefaultMessagesStore = defineStore({
  id: 'getDefaultMessages',
  state: getBaseInitialState<Record<string, string>>({ throwExceptionOnError: false }),
  actions: {
    thunk(urlParameters: GetDefaultMessages) {
      return thunkRequestHelper(this, authorizationService.getDefaultMessages, { urlParameters });
    },
  },
});
