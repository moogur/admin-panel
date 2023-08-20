import { RequestConfig, RequestConfigForProperties } from '@shared/types';
import { logout, prepareError } from '@shared/utils';

import { BaseStore } from '../types';

import { additionTo401Error, additionToAbort, additionToError, additionToRequest } from './store';

export async function thunkRequestHelper<
  ThunkReturnType,
  This extends BaseStore<ThunkReturnType>,
  Body = undefined,
  Url = undefined,
  Query = undefined,
>(
  that: This,
  thunk: (parameter: RequestConfigForProperties<Body, Url, Query>) => Promise<ThunkReturnType>,
  parameter: RequestConfig<Body, Url, Query>,
) {
  if (that.cacheRequest && that.loaded) return;
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

export function thunkRequestHelperWithoutParameters<ThunkReturnType, This extends BaseStore<ThunkReturnType>>(
  that: This,
  thunk: (parameter: RequestConfigForProperties) => Promise<ThunkReturnType>,
) {
  return thunkRequestHelper(that, thunk, {});
}
