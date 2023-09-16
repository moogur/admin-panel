import { defineStore } from 'pinia';

import { GetLocalizationMessages } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { SuccessResult } from '@shared/types';
import { convertObjectToFormData } from '@shared/utils';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateLocalizationMessagesStore = defineStore({
  id: 'updateLocalizationMessages',
  state: getBaseInitialState<SuccessResult>(),
  actions: {
    thunk(urlParameters: GetLocalizationMessages, file: File | null) {
      return thunkRequestHelper(this, authorizationService.updateLocalizationMessages, {
        urlParameters,
        body: convertObjectToFormData({ file }),
      });
    },
  },
});
