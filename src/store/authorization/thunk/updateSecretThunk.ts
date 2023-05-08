import { SecretKeysEnum } from '@shared/types';
import { successNotification } from '@shared/utils';
import { showErrorMessage } from '@store/utils';

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
