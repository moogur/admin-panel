import { storeToRefs } from 'pinia';

import { LoginAdmin } from '@api';
import { login, showErrorMessage } from '@shared/utils';

import { useAdminLoginStore } from '../slice';

import { requestsAfterLoginThunk } from './requestsAfterLoginThunk';

export async function adminLoginThunk(body: LoginAdmin) {
  const loginStore = useAdminLoginStore();
  const { data } = storeToRefs(loginStore);

  try {
    await loginStore.thunk(body);

    await requestsAfterLoginThunk(data.value);

    login({ data: data.value, needRedirect: true });
  } catch (error) {
    showErrorMessage(error);
  }
}
