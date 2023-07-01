import { defineStore } from 'pinia';

import { GetUsersQuery, UsersWithPagination } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetUsersStore = defineStore({
  id: 'getUsers',
  state: getBaseInitialState<UsersWithPagination>(),
  actions: {
    thunk(queryParameters: GetUsersQuery) {
      return thunkRequestHelper(this, authorizationService.getUsers, { queryParameters });
    },
  },
});
