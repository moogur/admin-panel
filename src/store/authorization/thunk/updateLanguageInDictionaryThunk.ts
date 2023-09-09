import { storeToRefs } from 'pinia';

import { UpdateLanguageDictionary } from '@api';
import { showErrorMessage } from '@shared/utils';

import { useGetLanguageDictionaryStore, useUpdateLanguageInDictionaryStore } from '../slice';

export async function updateLanguageInDictionaryThunk(
  id: string,
  body: UpdateLanguageDictionary,
  successCallback?: () => void,
) {
  const updateLanguageInDictionaryStore = useUpdateLanguageInDictionaryStore();
  const getLanguageDictionaryStore = useGetLanguageDictionaryStore();
  const { data } = storeToRefs(updateLanguageInDictionaryStore);

  try {
    await updateLanguageInDictionaryStore.thunk(id, body);
    if (data.value && getLanguageDictionaryStore.data) {
      const foundedIndex = getLanguageDictionaryStore.data.findIndex((item) => item.id === id);
      if (foundedIndex !== -1) getLanguageDictionaryStore.data[foundedIndex] = data.value;
    }
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
