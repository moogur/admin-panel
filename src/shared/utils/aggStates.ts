import { ToRefs } from 'vue';

import { HTTPError } from '@api/baseApi';
import { Store } from '@store';

export const getAggStatesLoading = (...states: Array<ToRefs<Store>>): boolean => {
  return states.some((state) => state.loading.value);
};

export const getAggStatesLoaded = (...states: Array<ToRefs<Store>>): boolean => {
  return states.every((state) => state.loaded.value);
};

export const getAggStatesError = (...states: Array<ToRefs<Store>>): HTTPError | null | undefined => {
  return states.find((state) => state.error.value)?.error.value;
};

export const getAggStatesOneLoaded = (...states: Array<ToRefs<Store>>): boolean => {
  return states.some((state) => state.loaded.value);
};
