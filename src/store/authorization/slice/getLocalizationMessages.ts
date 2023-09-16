import { defineStore } from 'pinia';

import { GetLocalizationMessages } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetLocalizationMessagesStore = defineStore({
  id: 'getLocalizationMessages',
  state: getBaseInitialState<Record<string, string>, { requestId: number }>({
    cacheRequest: false,
    throwExceptionOnError: false,
    additionalField: { requestId: 0 },
  }),
  actions: {
    thunk(urlParameters: GetLocalizationMessages) {
      return thunkRequestHelper(this, authorizationService.getLocalizationMessages, { urlParameters });
    },
  },
});
