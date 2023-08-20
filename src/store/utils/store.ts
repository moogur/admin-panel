import { BaseStore } from '../types';

export function getBaseInitialState<Data, AddFields extends object | undefined = undefined>(
  cacheRequest?: boolean,
  additionalField?: AddFields,
) {
  return function () {
    return {
      data: null,
      error: null,
      loaded: false,
      loading: false,
      abortController: null,
      cacheRequest: cacheRequest ?? false,
      ...structuredClone(additionalField),
    } as BaseStore<Data, AddFields>;
  };
}

export const additionToAbort = { loading: false, abortController: null } as const;
export const additionToRequest = { error: null, loaded: true, ...additionToAbort } as const;
export const additionToError = { data: null, loaded: false, ...additionToAbort } as const;
export const additionTo401Error = { error: null, ...additionToError } as const;
