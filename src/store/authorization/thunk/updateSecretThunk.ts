import { SecretKeysEnum } from '@shared/types';
import { successNotification, showErrorMessage } from '@shared/utils';

import { useUpdateSecretStore } from '../slice';

export async function updateSecretThunk(type: SecretKeysEnum) {
  const updateSecretStore = useUpdateSecretStore();

  try {
    await updateSecretStore.thunk(type);
    successNotification('Secret updated successfully');
  } catch (error) {
    showErrorMessage(error);
  }
}
