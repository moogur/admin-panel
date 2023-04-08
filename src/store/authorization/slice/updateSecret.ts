import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { OnlyId, RequestConfig, SecretKeysEnum } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateSecretStore = defineStore({
  id: 'updateSecret',
  state: getBaseInitialState<OnlyId>(),
  actions: {
    thunk(data: RequestConfig<{ status: SecretKeysEnum }>) {
      return thunkRequestHelper(this, authorizationService.updateSecret(data));
    },
  },
});
