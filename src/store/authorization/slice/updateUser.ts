import { defineStore } from 'pinia';

import { UpdateUser, User, authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useUpdateUserStore = defineStore({
  id: 'updateUser',
  state: getBaseInitialState<User>(),
  actions: {
    thunk(id: string, body: UpdateUser) {
      return thunkRequestHelper(this, authorizationService.updateUser, { body, urlParameters: { id } });
    },
  },
});
