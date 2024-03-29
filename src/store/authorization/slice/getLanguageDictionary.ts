import { defineStore } from 'pinia';

import { LanguageDictionary } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelperWithoutParameters } from '@store/utils';

export const useGetLanguageDictionaryStore = defineStore({
  id: 'getLanguageDictionary',
  state: getBaseInitialState<LanguageDictionary[]>({ cacheRequest: true, throwExceptionOnError: false }),
  actions: {
    thunk() {
      return thunkRequestHelperWithoutParameters(this, authorizationService.getLanguageDictionary);
    },
  },
});
