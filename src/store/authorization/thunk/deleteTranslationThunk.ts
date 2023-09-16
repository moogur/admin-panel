import { GetLocalizationMessages } from '@api';
import { showErrorMessage, successNotification } from '@shared/utils';

import { useDeleteTranslationStore } from '../slice';

export async function deleteTranslationThunk(parameters: GetLocalizationMessages, successCallback?: () => void) {
  const deleteTranslationStore = useDeleteTranslationStore();

  try {
    await deleteTranslationStore.thunk(parameters);
    successNotification('Translation deleted successfully');
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
