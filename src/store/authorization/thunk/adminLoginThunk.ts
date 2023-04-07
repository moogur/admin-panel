import { storeToRefs } from 'pinia';

import { LoginAdmin } from '@api';
import router from '@router';
import { links } from '@shared/constants';
import { RequestData } from '@shared/types';
import { useAuthStore } from '@store/app';

import { useAdminLoginStore } from '../slice';

export async function adminLoginThunk(data: RequestData<LoginAdmin>) {
  const { error } = storeToRefs(useAdminLoginStore());
  const { thunk } = useAdminLoginStore();

  await thunk(data);

  if (error.value) return console.log(error.value.message);

  const auth = useAuthStore();
  auth.setAuth(true);
  router.push(auth.url ?? links.main.path);
  if (auth.url) auth.setRedirectUrl(null);
}
