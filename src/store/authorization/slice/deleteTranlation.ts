import { defineStore } from 'pinia';

import { GetLocalizationMessages } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { SuccessResult } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useDeleteTranslationStore = defineStore({
  id: 'deleteTranslation',
  state: getBaseInitialState<SuccessResult>(),
  actions: {
    thunk(urlParameters: GetLocalizationMessages) {
      return thunkRequestHelper(this, authorizationService.deleteTranslation, { urlParameters });
    },
  },
});
