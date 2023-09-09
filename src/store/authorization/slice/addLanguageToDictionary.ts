import { defineStore } from 'pinia';

import { AddLanguageDictionary, LanguageDictionary } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useAddLanguageToDictionaryStore = defineStore({
  id: 'addLanguageToDictionary',
  state: getBaseInitialState<LanguageDictionary>(),
  actions: {
    thunk(body: AddLanguageDictionary) {
      return thunkRequestHelper(this, authorizationService.addLanguageToDictionary, { body });
    },
  },
});
