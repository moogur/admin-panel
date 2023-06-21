import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { SecretKeysEnum } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateSecretStore = defineStore({
  id: 'updateSecret',
  state: getBaseInitialState<{ status: true }>(),
  actions: {
    thunk(type: SecretKeysEnum) {
      return thunkRequestHelper(this, authorizationService.updateSecret, { body: { type } });
    },
  },
});
