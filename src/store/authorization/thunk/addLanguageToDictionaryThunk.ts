import { storeToRefs } from 'pinia';

import { AddLanguageDictionary } from '@api';
import { showErrorMessage } from '@shared/utils';

import { useAddLanguageToDictionaryStore, useGetLanguageDictionaryStore } from '../slice';

export async function addLanguageToDictionaryThunk(body: AddLanguageDictionary, successCallback?: () => void) {
  const addLanguageToDictionaryStore = useAddLanguageToDictionaryStore();
  const getLanguageDictionaryStore = useGetLanguageDictionaryStore();
  const { data } = storeToRefs(addLanguageToDictionaryStore);

  try {
    await addLanguageToDictionaryStore.thunk(body);
    if (data.value) {
      getLanguageDictionaryStore.data?.push(data.value);
      getLanguageDictionaryStore.data?.sort((first, second) => first.code.localeCompare(second.code));
    }
    successCallback?.();
  } catch (error) {
    showErrorMessage(error);
  }
}
