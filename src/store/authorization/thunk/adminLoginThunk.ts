import { storeToRefs } from 'pinia';

import { LoginAdmin } from '@api';
import router from '@router';
import { links } from '@shared/constants';
import { RequestData } from '@shared/types';
import { useAuthStore } from '@store/app';

import { useAdminLoginStore } from '../slice';

export async function adminLoginThunk(body: RequestData<LoginAdmin>) {
  const loginStore = useAdminLoginStore();
  const { error, data } = storeToRefs(loginStore);

  await loginStore.thunk(body);

  if (error.value || !data.value) return console.log(error.value?.message);

  const auth = useAuthStore();
  router.push(auth.url ?? links.main.path);
  if (auth.url) auth.setRedirectUrl(null);
  auth.setAuth(data.value);
}
