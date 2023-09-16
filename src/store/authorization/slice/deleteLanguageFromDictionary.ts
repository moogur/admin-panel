import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { SuccessResult } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useDeleteLanguageFromDictionaryStore = defineStore({
  id: 'deleteLanguageFromDictionary',
  state: getBaseInitialState<SuccessResult>(),
  actions: {
    thunk(code: string) {
      return thunkRequestHelper(this, authorizationService.deleteLanguageFromDictionary, { urlParameters: { code } });
    },
  },
});
