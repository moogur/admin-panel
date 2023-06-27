import { defineStore } from 'pinia';

import { authorizationService } from '@api/authorizationService';
import { convertObjectToFormData } from '@shared/utils';
import { getBaseInitialState, thunkRequestHelper } from '@store/utils';

export const useChangeAvatarStore = defineStore({
  id: 'changeAvatar',
  state: getBaseInitialState<{ result: true }>(),
  actions: {
    thunk(file: File | null) {
      return thunkRequestHelper(this, authorizationService.changeAvatar, { body: convertObjectToFormData({ file }) });
    },
  },
});
