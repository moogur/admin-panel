import { storeToRefs } from 'pinia';

import { LoginAdmin } from '@api';
import router from '@router';
import { links } from '@shared/constants';
import { RequestData } from '@shared/types';
import { errorNotification } from '@shared/utils';
import { useAuthStore } from '@store/app';

import { useAdminLoginStore } from '../slice';

export async function adminLoginThunk(body: RequestData<LoginAdmin>) {
  const loginStore = useAdminLoginStore();
  const { error, data } = storeToRefs(loginStore);

  await loginStore.thunk(body);

  if (error.value) return errorNotification(error.value);

  const auth = useAuthStore();
  router.push(auth.url ?? links.main.path);
  if (auth.url) auth.setRedirectUrl(null);
  auth.setAuth(data.value ?? { username: '', email: null, id: '' });
}
