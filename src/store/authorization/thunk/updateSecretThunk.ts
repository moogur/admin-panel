import { storeToRefs } from 'pinia';

import { SecretKeysEnum } from '@shared/types';

import { useUpdateSecretStore } from '../slice';

export async function updateSecretThunk(status: SecretKeysEnum) {
  const updateSecretStore = useUpdateSecretStore();
  const { error } = storeToRefs(updateSecretStore);

  await updateSecretStore.thunk({ data: { status } });

  if (error.value) return console.log(error.value.message);
}
