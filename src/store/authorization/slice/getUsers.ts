import { defineStore } from 'pinia';

import { GetUsersQuery, UserSortOrderFields, UsersWithPagination } from '@api/AuthorizationApi';
import { authorizationService } from '@api/authorizationService';
import { Sort } from '@shared/types';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useGetUsersStore = defineStore({
  id: 'getUsers',
  state: getBaseInitialState<UsersWithPagination, { sorter: Sort<UserSortOrderFields> }>({
    sorter: { key: 'createdDate', sortOrder: 'ascend' },
  }),
  actions: {
    thunk(queryParameters: GetUsersQuery) {
      return thunkRequestHelper(this, authorizationService.getUsers, { queryParameters });
    },
  },
});
