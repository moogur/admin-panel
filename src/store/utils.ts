import { RequestConfig, RequestConfigWithAbortSignal } from '@shared/types';
import { backErrorNotification, logout, prepareError } from '@shared/utils';

import { BaseStore } from './types';

export function getBaseInitialState<Data, AddFields extends object | undefined = undefined>(
  additionalField?: AddFields,
) {
  return function () {
    return {
      data: null,
      error: null,
      loaded: false,
      loading: false,
      abortController: null,
      ...structuredClone(additionalField),
    } as BaseStore<Data, AddFields>;
  };
}

const additionToAbort = { loading: false, abortController: null };
const additionToRequest = { error: null, loaded: true, ...additionToAbort };
const additionToError = { data: null, loaded: false, ...additionToAbort };
const additionTo401Error = { error: null, ...additionToError };

export async function thunkRequestHelper<ThunkReturnType, This extends BaseStore<ThunkReturnType>, Body, Url, Query>(
  that: This,
  thunk: (parameter: RequestConfigWithAbortSignal<Body, Url, Query>) => Promise<ThunkReturnType>,
  parameter: RequestConfig<Body, Url, Query>,
) {
  that.loading = true;
  try {
    const controller = new AbortController();
    that.abortController = controller;
    that.data = await thunk({ ...parameter, signal: controller.signal });
    Object.assign(that, additionToRequest);
  } catch (error) {
    const preparedError = prepareError(error);
    if (preparedError.response.status === 401) {
      Object.assign(that, additionTo401Error);
      logout();
    } else if (preparedError.response.status === 499) {
      Object.assign(that, additionToAbort);
    } else {
      Object.assign(that, additionToError, { error: preparedError });
    }
    throw error;
  }
}

export function showErrorMessage(error: unknown) {
  const preparedError = prepareError(error);
  if (preparedError.response.status !== 499) backErrorNotification(preparedError);
}
