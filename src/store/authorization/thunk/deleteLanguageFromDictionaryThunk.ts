import { showErrorMessage } from '@shared/utils';

import { useDeleteLanguageFromDictionaryStore, useGetLanguageDictionaryStore } from '../slice';

export async function deleteLanguageFromDictionaryThunk(code: string, successCallback?: () => void) {
  const deleteLanguageFromDictionaryStore = useDeleteLanguageFromDictionaryStore();
  const getLanguageDictionaryStore = useGetLanguageDictionaryStore();

  try {
    await deleteLanguageFromDictionaryStore.thunk(code);
    if (getLanguageDictionaryStore.data) {
      getLanguageDictionaryStore.data = getLanguageDictionaryStore.data.filter((item) => item.code !== code);
    }
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
