import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useDeleteLanguageFromDictionaryStore = defineStore({
  id: 'deleteLanguageFromDictionary',
  state: getBaseInitialState<{ result: true }>(),
  actions: {
    thunk(code: string) {
      return thunkRequestHelper(this, authorizationService.deleteLanguageFromDictionary, { urlParameters: { code } });
    },
  },
});
