import { HTTPError } from 'ky';

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

export async function thunkRequestHelper<T, K extends BaseStore<T>>(that: K, thunk: Promise<T>) {
  that.loading = true;
  try {
    that.data = await thunk;
    Object.assign(that, additionToRequest);
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 401) logout();
      that.error = error;
    } else {
      if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'TimeoutError') logout();
      that.error = new HTTPError(
        new Response('', {
          status: 520,
          statusText: 'Unknown Error',
        }),
        new Request(''),
        {
          method: '',
          credentials: 'include',
          retry: {},
          prefixUrl: '',
          onDownloadProgress: () => {},
        },
      );
    }
    Object.assign(that, additionToError);
  }
}
