import { ApiError, apiError520 } from '@api/baseApi';
import { logout } from '@shared/utils';

import { BaseStore } from './types';

export function getBaseInitialState<T>() {
  return function (): BaseStore<T> {
    return {
      data: null,
      error: null,
      loaded: false,
      loading: false,
    };
  };
}

const additionToRequest = { error: null, loaded: true, loading: false };
const additionToError = { data: null, loaded: false, loading: false };
const additionTo401Error = { error: null, ...additionToError };

export async function thunkRequestHelper<T, K extends BaseStore<T>>(that: K, thunk: Promise<T>) {
  that.loading = true;
  try {
    that.data = await thunk;
    Object.assign(that, additionToRequest);
  } catch (error) {
    const preparedError = error instanceof ApiError ? error : apiError520;
    if (preparedError.statusCode === 401) {
      Object.assign(that, additionTo401Error);
      logout(preparedError);
    } else {
      Object.assign(that, additionToError, { error: preparedError });
    }
  }
}
