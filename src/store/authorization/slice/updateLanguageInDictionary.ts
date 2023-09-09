import { defineStore } from 'pinia';

import { UpdateLanguageDictionary, LanguageDictionary } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateLanguageInDictionaryStore = defineStore({
  id: 'updateLanguageInDictionary',
  state: getBaseInitialState<LanguageDictionary>(),
  actions: {
    thunk(id: string, body: UpdateLanguageDictionary) {
      return thunkRequestHelper(this, authorizationService.updateLanguageInDictionary, { urlParameters: { id }, body });
    },
  },
});
