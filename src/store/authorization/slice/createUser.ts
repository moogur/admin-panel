import { defineStore } from 'pinia';

import { CreateUser, User, authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useCreateUserStore = defineStore({
  id: 'createUser',
  state: getBaseInitialState<User>(),
  actions: {
    thunk(body: CreateUser) {
      return thunkRequestHelper(this, authorizationService.createUser, { body });
    },
  },
});
