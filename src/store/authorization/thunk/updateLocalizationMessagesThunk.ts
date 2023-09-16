import { GetLocalizationMessages } from '@api';
import { showErrorMessage, successNotification } from '@shared/utils';

import { useUpdateLocalizationMessagesStore } from '../slice';

export async function updateLocalizationMessagesThunk(
  parameters: GetLocalizationMessages,
  data: Record<string, string>,
  successCallback?: () => void,
) {
  const updateLocalizationMessagesStore = useUpdateLocalizationMessagesStore();

  try {
    const file = new File([JSON.stringify(data)], `${parameters.code}.json`, {
      type: 'application/json',
    });
    await updateLocalizationMessagesStore.thunk(parameters, file);
    successNotification('Translation uploaded successfully');
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
