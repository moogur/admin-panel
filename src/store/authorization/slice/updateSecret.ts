import { HTTPError } from 'ky';
import assign from 'lodash-es/assign';
import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { OnlyId, RequestConfig, SecretKeysEnum } from '@shared/types';
import { BaseStore } from '@store/types';
import { additionToRequest, additionToError, baseInitialState } from '@store/utils';

export type UpdateSecretStore = BaseStore<OnlyId>;

export const useUpdateSecretStore = defineStore({
  id: 'updateSecret',
  state: (): UpdateSecretStore => ({ ...baseInitialState }),
  actions: {
    async thunk(data: RequestConfig<{ status: SecretKeysEnum }>) {
      this.loading = true;
      try {
        this.data = await authorizationService.updateSecret(data);
        assign(this, additionToRequest);
      } catch (error) {
        this.error = error instanceof HTTPError ? error : null;
        assign(this, additionToError);
      }
    },
  },
});
