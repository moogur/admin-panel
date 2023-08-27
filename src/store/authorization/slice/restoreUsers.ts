import { defineStore } from 'pinia';

import { DeleteUsers } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useRestoreUsersStore = defineStore({
  id: 'restoreUsers',
  state: getBaseInitialState<DeleteUsers>(),
  actions: {
    thunk(queryParameters: DeleteUsers) {
      return thunkRequestHelper(this, authorizationService.restoreUsers, { queryParameters });
    },
  },
});
