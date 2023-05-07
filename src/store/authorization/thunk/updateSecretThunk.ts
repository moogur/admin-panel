import { storeToRefs } from 'pinia';

import { SecretKeysEnum } from '@shared/types';
import { errorNotification } from '@shared/utils';

import { useUpdateSecretStore } from '../slice';

export async function updateSecretThunk(type: SecretKeysEnum) {
  const updateSecretStore = useUpdateSecretStore();
  const { error } = storeToRefs(updateSecretStore);

  await updateSecretStore.thunk({ data: { type } });

  if (error.value) errorNotification(error.value);
}
